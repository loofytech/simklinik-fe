import AppLayout from "@/layouts/AppLayout";
import { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import moment from "moment";

interface DataType {
  id: number;
  clinic_rate: any;
  reference_limit: string;
  age_limit: string;
  gender: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

export default function MasterLabTest() {
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
    {title: 'LAB TEST', dataIndex: 'clinic_rate', sorter: false, render: (value, record) => {
      return `${value.name}`;
    }},
    {title: 'NILAI RUJUKAN', dataIndex: 'reference_limit', sorter: false, render: (value, record) => {
      return `${value}`;
    }},
    {title: 'BATAS UMUR', dataIndex: 'age_limit', sorter: false, render: (value, record) => {
      return `${value}`;
    }},
    {title: 'JENIS KELAMIN', dataIndex: 'gender', sorter: false, render: (value, record) => {
      return `${value === "P" ? "Perempuan" : "Laki - Laki"}`;
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
    const request = await fetch(`/api/master-lab-test?page=${page ?? 1}`);
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