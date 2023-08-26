import { Card, Select } from "antd";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SET_SERVICE_ID, SET_UNIT_ID, SET_USER_ID } from "@/store/reducers/registration";

export default function FormService() {
  const [services, setServices] = useState<any>([]);
  const [units, setUnits] = useState<any>([]);
  const [doctors, setDoctors] = useState<any>([]);

  const {
    service_id,
    unit_id,
    user_id
  } = useSelector((state: any) => state.registration);
  const dispatch = useDispatch();

  const fetchService = async () => {
    const request = await fetch("/api/service");
    if ([200, 201].includes(request.status)) {
      const response = await request.json();
      let data: any = [];
      if (response.data.length > 0) response.data.map((dtl: any) => {
        data.push({label: dtl.service_name, value: dtl.id});
      });
      return setServices(data);
    }
  }

  const handleServiceChange = async (value: any) => {
    dispatch(SET_SERVICE_ID(value));
    const request = await fetch("/api/unit", {method: "PUT", body: JSON.stringify({service: value})});
    if ([200, 201].includes(request.status)) {
      const response = await request.json();
      let data: any = [];
      if (response.data.length > 0) response.data.map((dtl: any) => {
        data.push({label: dtl.unit_name, value: dtl.id});
      });
      return setUnits(data);
    }
  }

  const handleUnitChange = async (value: any) => {
    dispatch(SET_UNIT_ID(value));
    const request = await fetch("/api/doctor-schedule", {method: "PUT", body: JSON.stringify({unit: value})});
    if ([200, 201].includes(request.status)) {
      const response = await request.json();
      let data: any = [];
      if (response.data.length > 0) response.data.map((dtl: any) => {
        data.push({label: dtl.user.name, value: dtl.user_id});
      });
      return setDoctors(data);
    }
  }

  useEffect(() => {
    fetchService();
  }, []);

  return (<>
    <Card title="Pelayanan Klinik" bordered={false}>
      <div className="flex flex-col gap-1">
        <span className="font-bold">Layanan</span>
        <Select
          defaultValue={service_id}
          onChange={(evt) => handleServiceChange(evt)}
          options={services}
        />
      </div>
      <div className="mt-4 flex flex-col gap-1">
        <span className="font-bold">Unit</span>
        <Select
          defaultValue={unit_id}
          onChange={(evt) => handleUnitChange(evt)}
          options={units}
        />
      </div>
      <div className="mt-4 flex flex-col gap-1">
        <span className="font-bold">Dokter</span>
        <Select
          defaultValue={user_id}
          onChange={(evt) => dispatch(SET_USER_ID(evt))}
          options={doctors}
        />
      </div>
    </Card>
  </>);
}