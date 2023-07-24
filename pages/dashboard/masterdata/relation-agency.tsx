import AppLayout from "@/layouts/AppLayout";
import { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import moment from "moment";

interface DataType {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

export default function ClinicRate() {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);

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
    {title: 'ALAMAT', dataIndex: 'address', sorter: false, render: (value, record) => {
      return `${value}`;
    }},
    {title: 'TELEPON', dataIndex: 'phone', sorter: false, render: (value, record) => {
      return `${value}`;
    }},
    {title: 'EMAIL', dataIndex: 'email', sorter: false, render: (value, record) => {
      return `${value}`;
    }},
    {title: 'WEBSITE', dataIndex: 'website', sorter: false, render: (value, record) => {
      return `${value}`;
    }},
  ];

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

  useEffect(() => {
    fetchData();
  }, []);

  return (<AppLayout>
    <Table
      bordered
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  </AppLayout>);
}