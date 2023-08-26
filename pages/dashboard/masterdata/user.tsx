import AppLayout from "@/layouts/AppLayout";
import { useEffect, useState } from "react";
import { Table, Modal, Select } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { LoadingOutlined } from "@ant-design/icons";

interface DataType {
  id: number;
  name: string;
  username: string;
  email: string;
  role_id: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

export default function User() {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [modalCreate, setModalCreate] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<any>(null);
  const [roles, setRoles] = useState<any>([]);
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
    {title: 'NAMA', dataIndex: 'name', sorter: false, render: (value, record) => {
      return `${value}`;
    }},
    {title: 'USERNAME', dataIndex: 'username', sorter: false, render: (value, record) => {
      return `${value}`;
    }},
    {title: 'EMAIL', dataIndex: 'email', sorter: false, render: (value, record) => {
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
    const request = await fetch(`/api/user?page=${page ?? 1}`);
    const response = await request.json();

    setData(response.user);
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

    const request = await fetch(`/api/user`, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        username: username,
        email: email,
        password: password,
        role_id: role,
      })
    });

    if (request.status === 200) {
      const response = await request.json();
      return location.reload();
    }
    setSubmit(false);
  }

  const fetchRole = async () => {
    const request = await fetch("/api/role");
    if ([200, 201].includes(request.status)) {
      const response = await request.json();
      let data: any = [];
      if (response.data.length > 0) response.data.map((dtl: any) => {
        data.push({label: dtl.role_name, value: dtl.id});
      });
      return setRoles(data);
    }
  }

  useEffect(() => {
    fetchData();
    fetchRole();
  }, []);

  return (<AppLayout>
    <div className="bg-white">
      <div className="p-3">
        <button className="px-4 py-2 bg-primary text-white rounded text-sm" type="button" onClick={() => setModalCreate(true)}>Tambah User</button>
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
          <label htmlFor="name" className="font-bold">Nama</label>
          <input
            type="text"
            className="px-3 border rounded h-10 outline-none"
            autoComplete="off"
            value={name}
            onChange={(evt) => setName(evt.target.value)}
          />
        </div>
        <div className="mb-3 flex flex-col gap-1.5">
          <label htmlFor="username" className="font-bold">Username</label>
          <input
            type="text"
            className="px-3 border rounded h-10 outline-none"
            autoComplete="off"
            value={username}
            onChange={(evt) => setUsername(evt.target.value)}
          />
        </div>
        <div className="mb-3 flex flex-col gap-1.5">
          <label htmlFor="email" className="font-bold">Email</label>
          <input
            type="text"
            className="px-3 border rounded h-10 outline-none"
            autoComplete="off"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
          />
        </div>
        <div className="mb-3 flex flex-col gap-1.5">
          <label htmlFor="password" className="font-bold">Password</label>
          <input
            type="password"
            className="px-3 border rounded h-10 outline-none"
            autoComplete="off"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
          />
        </div>
        <div className="mb-3 flex flex-col gap-1.5">
          <label htmlFor="name" className="font-bold">Pilih Role</label>
          <Select
            defaultValue={role}
            onChange={(value) => setRole(value)}
            allowClear
            options={roles}
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