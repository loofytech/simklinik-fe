import AppLayout from "@/layouts/AppLayout";
import { useEffect, useState } from "react";
import { Table, Modal, Select } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { LoadingOutlined } from "@ant-design/icons";
import { formatIDR } from "@/utils/globalFunction";

interface DataType {
  id: number;
  insurance_product_name: string;
  insurance_product_admin_fee: string;
  insurance_product_max_admin_fee: string;
  insurance_product_stamp: string;
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
  const [adminFee, setAdminFee] = useState<string>("");
  const [maxAdminFee, setMaxAdminFee] = useState<string>("");
  const [stamp, setStamp] = useState<string>("");
  const [agency, setAgency] = useState<any>(null);
  const [submit, setSubmit] = useState<boolean>(false);
  const [agencies, setAgencies] = useState<any>([]);

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
    {title: 'NAMA ASURANSI', dataIndex: 'insurance_product_name', sorter: false, render: (value, record) => {
      return `Rp ${formatIDR(value)}`;
    }},
    {title: 'ADMIN FEE', dataIndex: 'insurance_product_admin_fee', sorter: false, render: (value, record) => {
      return `Rp ${formatIDR(value)}`;
    }},
    {title: 'MATERAI', dataIndex: 'insurance_product_stamp', sorter: false, render: (value, record) => {
      return `Rp ${formatIDR(value)}`;
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
    const request = await fetch(`/api/insurance-product?page=${page ?? 1}`);
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

    const request = await fetch(`/api/insurance-product`, {
      method: "POST",
      body: JSON.stringify({
        insurance_product_name: name,
        insurance_product_admin_fee: adminFee,
        insurance_product_max_admin_fee: maxAdminFee,
        insurance_product_stamp: stamp,
        relation_agency_id: agency
      })
    });

    if (request.status === 200) {
      const response = await request.json();
      return location.reload();
    }
    setSubmit(false);
  }

  const fetchAgency = async () => {
    const request = await fetch("/api/relation-agency");
    if ([200, 201].includes(request.status)) {
      const response = await request.json();
      let data: any = [];
      if (response.data.length > 0) response.data.map((dtl: any) => {
        data.push({label: dtl.relation_agency_name, value: dtl.id});
      });
      return setAgencies(data);
    }
  }

  useEffect(() => {
    fetchData();
    fetchAgency();
  }, []);

  return (<AppLayout>
    <div className="bg-white">
      <div className="p-3">
        <button className="px-4 py-2 bg-primary text-white rounded text-sm" type="button" onClick={() => setModalCreate(true)}>Tambah Asuransi</button>
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
      title="Tambah Asuransi"
      centered
      open={modalCreate}
      onCancel={() => setModalCreate(false)}
      footer={false}
    >
      <form onSubmit={postData} className="mt-3">
        <div className="mb-3 flex flex-col gap-1.5">
          <label htmlFor="name" className="font-bold">Pilih Instansi</label>
          <Select
            defaultValue={agency}
            onChange={(value) => setAgency(value)}
            allowClear
            options={agencies}
          />
        </div>
        <div className="mb-3 flex flex-col gap-1.5">
          <label htmlFor="name" className="font-bold">Nama Asuransi</label>
          <input
            type="text"
            className="px-3 border rounded h-10 outline-none"
            autoComplete="off"
            value={name}
            onChange={(evt) => setName(evt.target.value)}
          />
        </div>
        <div className="mb-3 flex flex-col gap-1.5">
          <label htmlFor="phone" className="font-bold">Admin Fee</label>
          <input
            type="text"
            className="px-3 border rounded h-10 outline-none"
            autoComplete="off"
            value={adminFee}
            onChange={(evt) => setAdminFee(evt.target.value)}
          />
        </div>
        <div className="mb-3 flex flex-col gap-1.5">
          <label htmlFor="email" className="font-bold">Maksimal Admin Fee</label>
          <input
            type="text"
            className="px-3 border rounded h-10 outline-none"
            autoComplete="off"
            value={maxAdminFee}
            onChange={(evt) => setMaxAdminFee(evt.target.value)}
          />
        </div>
        <div className="mb-3 flex flex-col gap-1.5">
          <label htmlFor="email" className="font-bold">Materai</label>
          <input
            type="text"
            className="px-3 border rounded h-10 outline-none"
            autoComplete="off"
            value={stamp}
            onChange={(evt) => setStamp(evt.target.value)}
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