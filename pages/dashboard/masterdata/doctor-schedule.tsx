import AppLayout from "@/layouts/AppLayout";
import { useEffect, useState } from "react";
import { Table, Modal, Select, TimePicker, Button } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { LoadingOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

interface DataType {
  id: number;
  open_practice: string;
  close_practice: string;
  day: string;
  user?: any;
  unit?: any;
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
  const [day, setDay] = useState<any>(null);
  const [submit, setSubmit] = useState<boolean>(false);
  const [users, setUsers] = useState<any>([]);
  const [user, setUser] = useState<any>(null);
  const [units, setUnits] = useState<any>([]);
  const [unit, setUnit] = useState<any>(null);
  const [openPpractice, setOpenPractice] = useState<any>(null);
  const [closePpractice, setClosePractice] = useState<any>(null);
  const [sOpen, setSOpen] = useState<boolean>(false);
  const [eOpen, setEOpen] = useState<boolean>(false);

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
    {title: 'DOKTER', dataIndex: 'user', sorter: false, render: (value, record) => {
      return `${value?.name}`;
    }},
    {title: 'UNIT', dataIndex: 'unit', sorter: false, render: (value, record) => {
      return `${value?.unit_name}`;
    }},
    {title: 'PRAKTEK', dataIndex: 'open_practice', sorter: false, render: (value, record) => {
      return `${record.day.charAt(0).toUpperCase() + record.day.slice(1)}, ${value} - ${record.close_practice}`;
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

  const postData = async (event: any) => {
    event.preventDefault();
    setSubmit(true);

    const request = await fetch(`/api/doctor-schedule`, {
      method: "POST",
      body: JSON.stringify({
        open_practice: openPpractice,
        close_practice: closePpractice,
        user_id: user,
        unit_id: unit,
        day: day
      })
    });

    if (request.status === 200) {
      const response = await request.json();
      return location.reload();
    }
    setSubmit(false);
  }

  const fetchUser = async () => {
    const request = await fetch("/api/user");
    if ([200, 201].includes(request.status)) {
      const response = await request.json();
      let data: any = [];
      if (response.user.length > 0) response.user.map((dtl: any) => {
        if (dtl.role_id == 3) {
          data.push({label: dtl.name, value: dtl.id});
        }
      });
      return setUsers(data);
    }
  }

  const fetchUnit = async () => {
    const request = await fetch("/api/unit");
    if ([200, 201].includes(request.status)) {
      const response = await request.json();
      let data: any = [];
      if (response.data.length > 0) response.data.map((dtl: any) => {
        data.push({label: dtl.unit_name, value: dtl.id});
      });
      return setUnits(data);
    }
  }

  useEffect(() => {
    fetchData();
    fetchUser();
    fetchUnit();
  }, []);

  return (<AppLayout>
    <div className="bg-white">
      <div className="p-3">
        <button className="px-4 py-2 bg-primary text-white rounded text-xs" type="button" onClick={() => setModalCreate(true)}>Tambah Jadwal Dokter</button>
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
          <label htmlFor="name" className="font-bold">Pilih Dokter</label>
          <Select
            defaultValue={user}
            onChange={(value) => setUser(value)}
            options={users}
          />
        </div>
        <div className="mb-3 flex flex-col gap-1.5">
          <label htmlFor="name" className="font-bold">Pilih Unit</label>
          <Select
            defaultValue={unit}
            onChange={(value) => setUnit(value)}
            options={units}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="mb-3 flex flex-col gap-1.5">
            <label htmlFor="name" className="font-bold">Hari</label>
            <Select
              defaultValue={day}
              onChange={(value) => setDay(value)}
              options={[
                {label: "Senin", value: "senin"},
                {label: "Selasa", value: "selasa"},
                {label: "Rabu", value: "rabu"},
                {label: "Kamis", value: "kamis"},
                {label: "Jum'at", value: "jumat"},
                {label: "Sabtu", value: "sabtu"},
                {label: "Minggu", value: "minggu"}
              ]}
            />
          </div>
          <div className="mb-3 flex flex-col gap-1.5">
            <label htmlFor="name" className="font-bold">Dari Jam</label>
            <TimePicker
              open={sOpen}
              onOpenChange={setSOpen}
              format={"HH:mm"}
              placeholder=""
              onChange={(evt) => setOpenPractice(dayjs(evt).format("HH:mm"))}
            />
          </div>
          <div className="mb-3 flex flex-col gap-1.5">
            <label htmlFor="name" className="font-bold">Sampai Jam</label>
            <TimePicker
              open={eOpen}
              onOpenChange={setEOpen}
              format={"HH:mm"}
              placeholder=""
              onChange={(evt) => setClosePractice(dayjs(evt).format("HH:mm"))}
            />
          </div>
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