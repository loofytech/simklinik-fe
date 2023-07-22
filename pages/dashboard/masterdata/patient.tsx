import AppLayout from "@/layouts/AppLayout";
import { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import moment from "moment";
import "moment/locale/id";

interface DataType {
  id: number;
  name: string;
  gender: string;
  phone: string;
  birth_place: string;
  birth_date: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

export default function Patient() {
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
    {title: 'NAMA', dataIndex: 'name', sorter: false, render: (value) => {
      return `${value}`;
    }},
    {title: 'JENIS KELAMIN', dataIndex: 'gender', sorter: false, render: (value) => {
      return `${value === "P" ? "Perempuan" : "Laki - Laki"}`;
    }},
    {title: 'NO TELEPON', dataIndex: 'phone', sorter: false, render: (value) => {
      return `${value}`;
    }},
    {title: 'TEMPAT LAHIR', dataIndex: 'birth_place', sorter: false, render: (value) => {
      return `${value}`;
    }},
    {title: 'TANGGAL LAHIR', dataIndex: 'birth_date', sorter: false, render: (value, record) => {
      return <span>{moment(value).locale("id").format("LL")}, <b>({moment().diff(value, 'years')} Tahun)</b></span>;
    }}
  ];

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTableParams({pagination});

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
    fetchData(pagination.current);
  }

  const fetchData = async (page?: any) => {
    const request = await fetch(`/api/patient?page=${page ?? 1}`);
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