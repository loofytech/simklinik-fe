import AppLayout from "@/layouts/AppLayout";
import { useEffect, useState } from "react";
import { Table, Modal } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { LoadingOutlined } from "@ant-design/icons";
import { BiMinus } from "react-icons/bi";
import dayjs from "dayjs";
import "dayjs/locale/id";
import Link from "next/link";
dayjs.locale("id");

interface DataType {
  id: number;
  patient: any;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

export default function Screening() {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [modalCreate, setModalCreate] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [submit, setSubmit] = useState<boolean>(false);
  const [date, setDate] = useState<any>(null);

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 10
    }
  });

  const columns: ColumnsType<DataType> = [
    {title: "NO", dataIndex: "id", sorter: false, width: 10, render: (value, record, index) => {
      return <div className="text-center">{index + 1}</div>;
    }},
    {title: 'NO. RM', dataIndex: 'patient', sorter: false, render: (value, record) => {
      return `${value?.medical_record}`;
    }},
    {title: 'NAMA', dataIndex: 'patient', sorter: false, render: (value, record) => {
      return `${value?.patient_name}`;
    }},
    {title: 'AKSI', dataIndex: 'id', sorter: false, render: (value, record) => {
      return (<>
        <Link
          href={"/dashboard/public-service/screening/" + value}
          type="button"
          className="px-3 py-1.5 bg-green-400 font-bold text-white rounded text-xs hover:text-white"
        >
          Skrining
        </Link>
      </>);
    }},
  ]

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTableParams({pagination});

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
    fetchData(pagination.current);
  }

  const fetchData = async (page?: any) => {
    const request = await fetch(`/api/screening?page=${page ?? 1}`);
    const response = await request.json();

    setData(response.data);
    setLoading(false);
    setTableParams({pagination: {
      current: response.current_page,
      pageSize: response.per_page,
      total: response.total
    }});
  }

  const postData = async (event: any) => {
    event.preventDefault();
    setSubmit(true);

    const request = await fetch(`/api/ethnic`, {
      method: "POST",
      body: JSON.stringify({
        ethnic_name: name,
        ethnic_slug: name.split(" ").join("_").toLowerCase()
      })
    });

    if (request.status === 200) {
      const response = await request.json();
      return location.reload();
    }
    setSubmit(false);
  }

  useEffect(() => {
    fetchData();
    setDate(dayjs(new Date()).format("MMMM D, YYYY"));
  }, []);

  return (<AppLayout>
    <div className="bg-white">
      <div className="p-3 flex items-center justify-between text-xl">
        {/* <button className="px-4 py-2 bg-primary text-white rounded text-sm" type="button" onClick={() => setModalCreate(true)}>Tambah Suku</button> */}
        <span className="font-bold">Skrining list</span>
        <span className="">{date}</span>
      </div>
      <Table
        bordered
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
    <Modal
      title="Tambah Suku"
      centered
      open={modalCreate}
      onCancel={() => setModalCreate(false)}
      footer={false}
    >
      <form onSubmit={postData} className="mt-3">
        <div className="mb-3 flex flex-col gap-1.5">
          <label htmlFor="name" className="font-bold">Suku</label>
          <input
            type="text"
            className="px-3 border rounded h-10 outline-none"
            autoComplete="off"
            value={name}
            onChange={(evt) => setName(evt.target.value)}
          />
        </div>
        <button
          type="submit"
          className={`${submit ? "opacity-70" : "opacity-100"} bg-primary px-4 py-2 text-white rounded text-sm flex items-center gap-2`}
          disabled={submit}
        >
          {submit && <LoadingOutlined style={{ fontSize: 18 }} spin />}
          Submit
        </button>
      </form>
    </Modal>
  </AppLayout>);
}