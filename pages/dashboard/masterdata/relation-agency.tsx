import AppLayout from "@/layouts/AppLayout";
import { useEffect, useState } from "react";
import { Table, Modal } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { LoadingOutlined } from "@ant-design/icons";

interface DataType {
  id: number;
  relation_agency_name: string;
  relation_agency_address: string;
  relation_agency_phone: string;
  relation_agency_email: string;
  relation_agency_website: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

export default function RelationAgency() {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [modalCreate, setModalCreate] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [submit, setSubmit] = useState<boolean>(false);

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
    {title: 'NAMA INSTANSI', dataIndex: 'relation_agency_name', sorter: false, render: (value, record) => {
      return `${value}`;
    }},
    {title: 'TELEPON', dataIndex: 'relation_agency_phone', sorter: false, render: (value, record) => {
      return `${value}`;
    }},
    {title: 'EMAIL', dataIndex: 'relation_agency_email', sorter: false, render: (value, record) => {
      return `${value}`;
    }},
    {title: 'WEBSITE', dataIndex: 'relation_agency_website', sorter: false, render: (value, record) => {
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
    const request = await fetch(`/api/relation-agency?page=${page ?? 1}`);
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

    const request = await fetch(`/api/relation-agency`, {
      method: "POST",
      body: JSON.stringify({
        relation_agency_name: name,
        relation_agency_address: address,
        relation_agency_phone: phone,
        relation_agency_email: email,
        relation_agency_website: website
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
  }, []);

  return (<AppLayout>
    <div className="bg-white">
      <div className="p-3">
        <button className="px-4 py-2 bg-primary text-white rounded text-sm" type="button" onClick={() => setModalCreate(true)}>Tambah Instansi Relasi</button>
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
      title=""
      centered
      open={modalCreate}
      onCancel={() => setModalCreate(false)}
      footer={false}
    >
      <form onSubmit={postData} className="mt-3">
        <div className="mb-3 flex flex-col gap-1.5">
          <label htmlFor="name" className="font-bold">Nama Instansi</label>
          <input
            type="text"
            className="px-3 border rounded h-10 outline-none"
            autoComplete="off"
            value={name}
            onChange={(evt) => setName(evt.target.value)}
          />
        </div>
        <div className="mb-3 flex flex-col gap-1.5">
          <label htmlFor="address" className="font-bold">Alamat Instansi</label>
          <input
            type="text"
            className="px-3 border rounded h-10 outline-none"
            autoComplete="off"
            value={address}
            onChange={(evt) => setAddress(evt.target.value)}
          />
        </div>
        <div className="mb-3 flex flex-col gap-1.5">
          <label htmlFor="phone" className="font-bold">Telepon Instansi</label>
          <input
            type="text"
            className="px-3 border rounded h-10 outline-none"
            autoComplete="off"
            value={phone}
            onChange={(evt) => setPhone(evt.target.value)}
          />
        </div>
        <div className="mb-3 flex flex-col gap-1.5">
          <label htmlFor="email" className="font-bold">Email Instansi</label>
          <input
            type="text"
            className="px-3 border rounded h-10 outline-none"
            autoComplete="off"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
          />
        </div>
        <div className="mb-3 flex flex-col gap-1.5">
          <label htmlFor="website" className="font-bold">Website Instansi</label>
          <input
            type="text"
            className="px-3 border rounded h-10 outline-none"
            autoComplete="off"
            value={website}
            onChange={(evt) => setWebsite(evt.target.value)}
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