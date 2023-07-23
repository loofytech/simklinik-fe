import AppLayout from "@/layouts/AppLayout";
import { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import moment from "moment";

interface DataType {
  id: number;
  version_number: number;
  status: number;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

export default function FareVersion() {
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
    {title: 'NOMOR VERSI', dataIndex: 'version_number', sorter: false, render: (value, record) => {
      return `${value}`;
    }},
    {title: 'STATUS', dataIndex: 'status', sorter: false, render: (value, record) => {
      if (value < 1) {
        return <span className="bg-red-500 text-white text-xs font-bold px-4 py-1 rounded">Tidak Aktif</span>;
      } else {
        return <span className="bg-green-500 text-white text-xs font-bold px-4 py-1 rounded">Aktif</span>;
      }
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
    const request = await fetch(`/api/fare-version?page=${page ?? 1}`);
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