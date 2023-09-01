import AppLayout from "@/layouts/AppLayout";
import { useState, useEffect } from "react";
import { Table, Modal } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import Link from "next/link";
import { useRouter } from "next/router";
import { ExclamationCircleFilled } from '@ant-design/icons';

interface DataType {
  id: number;
  patient: any;
  service: any;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

export default function RegistrationIndex() {
  const router = useRouter();
  const { confirm } = Modal;

  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState<boolean>(false);

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
    {title: 'PASIEN', dataIndex: 'patient', sorter: false, render: (value, record) => {
      return `${value?.patient_name}`;
    }},
    {title: 'LAYANAN', dataIndex: 'service', sorter: false, render: (value, record) => {
      // console.log(value);
      return `${value?.service_name}`;
    }},
    {title: 'AKSI', dataIndex: 'id', sorter: false, render: (value, record) => {
      return (<>
        <button
          type="button"
          onClick={() => processScreening(value)}
          className="px-3 py-2 bg-primary hover:text-white font-bold text-white rounded text-sm"
        >
          Skrining
        </button>
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
    const request = await fetch(`/api/registration?page=${page ?? 1}`);
    if ([200, 201, 300, 301, 304].includes(request.status)) {
      const response = await request.json();

      setData(response.data);
      setLoading(false);
      setTableParams({pagination: {
        current: response.current_page,
        pageSize: response.per_page,
        total: response.total
      }});
    }
  }

  const processScreening = (param: number) => {
    confirm({
      title: 'Apakah anda yakin ingin memproses data ini?',
      icon: <ExclamationCircleFilled />,
      content: 'Data ini akan di proses ke tahap selanjutnya, yaitu proses krining.',
      onOk: () => {
        return fetch("/api/registration", {method: "PUT", body: JSON.stringify({registration_id: param})})
            .then((result) => result.json())
            .then((data) => {
              console.log(data);
              fetchData();
            })
            .catch((err) => {
              console.log(err)
            });
      },
      onCancel() {},
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (<AppLayout active="registration">
    <div className="mb-5">
      <button
        type="button"
        className="py-2 px-3 bg-primary text-white rounded"
        onClick={() => router.push("/dashboard/registration/create")}
      >
        Registrasi
      </button>
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
  </AppLayout>);
}