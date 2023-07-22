import AppLayout from "@/layouts/AppLayout";
import { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import moment from "moment";

interface DataType {
  id: number;
  user: any;
  unit: any;
  day: number;
  from: string;
  to: string;
  quota: number;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

export default function DoctorSchedule() {
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
    {title: 'NAMA', dataIndex: 'user', sorter: false, render: (value, record) => {
      return `${value.name}`;
    }},
    {title: 'UNIT', dataIndex: 'unit', sorter: false, render: (value, record) => {
      return `${value.name}`;
    }},
    {title: 'HARI', dataIndex: 'day', sorter: false, render: (value, record) => {
      const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu'];
      return `${days[value]}`;
    }},
    {title: 'JADWAL', dataIndex: 'from', sorter: false, render: (value, record) => {
      const from = value.split(":")[0] + ":" + value.split(":")[1];
      const to = record.to.split(":")[0] + ":" + record.to.split(":")[1];
      return from + " - " + to;
    }},
    {title: 'KUOTA PASIEN', dataIndex: 'quota', sorter: false, render: (value, record) => {
      return value + " Pasien";
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
    const request = await fetch(`/api/doctor-schedule?page=${page ?? 1}`);
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