import AppLayout from "@/layouts/AppLayout";
import { useEffect, useState } from "react";
import { Table, Modal, Select } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { LoadingOutlined } from "@ant-design/icons";

interface DataType {
  id: number;
  unit_name: string;
  unit_slug: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

export default function Unit() {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [modalCreate, setModalCreate] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [submit, setSubmit] = useState<boolean>(false);
  const [services, setServices] = useState<any>([]);
  const [service, setService] = useState<any>(null);

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
    {title: 'NAMA UNIT', dataIndex: 'unit_name', className: "w-8/12", sorter: false, render: (value, record) => {
      return `${value}`;
    }},
    {title: 'AKSI', dataIndex: 'id', sorter: false, render: (value, record) => {
      return (<>
        <button type="button" className="px-3 py-1.5 bg-green-400 font-bold text-white rounded text-xs">Update</button>
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
    const request = await fetch(`/api/unit?page=${page ?? 1}`);
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

    const request = await fetch(`/api/unit`, {
      method: "POST",
      body: JSON.stringify({
        unit_name: name,
        unit_slug: name.split(" ").join("_").toLowerCase(),
        service_id: service
      })
    });

    if (request.status === 200) {
      const response = await request.json();
      return location.reload();
    }
    setSubmit(false);
  }

  const fetchService = async () => {
    const request = await fetch("/api/service");
    if ([200, 201].includes(request.status)) {
      const response = await request.json();
      let data: any = [];
      if (response.data.length > 0) response.data.map((dtl: any) => {
        data.push({label: dtl.service_name, value: dtl.id});
      });
      return setServices(data);
    }
  }

  useEffect(() => {
    fetchData();
    fetchService();
  }, []);

  return (<AppLayout>
    <div className="bg-white">
      <div className="p-3">
        <button className="px-4 py-2 bg-primary text-white rounded text-xs" type="button" onClick={() => setModalCreate(true)}>Tambah Unit Layanan</button>
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
      title="Tambah Unit Layanan"
      centered
      open={modalCreate}
      onCancel={() => setModalCreate(false)}
      footer={false}
    >
      <form onSubmit={postData} className="mt-3">
        <div className="mb-3 flex flex-col gap-1.5">
          <label htmlFor="name" className="font-bold">Pilih Instansi</label>
          <Select
            defaultValue={service}
            onChange={(value) => setService(value)}
            options={services}
          />
        </div>
        <div className="mb-3 flex flex-col gap-1.5">
          <label htmlFor="name" className="font-bold">Unit</label>
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