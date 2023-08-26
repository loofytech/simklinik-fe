import { Card, Checkbox, Input, Select } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  SET_RESPONSIBLE_NAME,
  SET_RESPONSIBLE_PHONE,
  SET_RESPONSIBLE_ADDRESS,
  SET_RESPONSIBLE_RELATION
} from "@/store/reducers/registration";

export default function FormResponsible() {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const {
    responsible_name,
    responsible_phone,
    responsible_address,
    responsible_relation,
    patient_name,
    patient_address,
    patient_phone
  } = useSelector((state: any) => state.registration);
  const dispatch = useDispatch();

  const relationOptions = [
    {label: "Pasien Sendiri", value: "self"},
    {label: "Suami", value: "suami"},
    {label: "Istri", value: "istri"},
    {label: "Anak", value: "anak"},
    {label: "Kakak", value: "kakak"},
    {label: "Adik", value: "adik"},
    {label: "Paman", value: "paman"},
    {label: "Bibi", value: "bibi"}
  ];

  const handleResponsible = (evt: CheckboxChangeEvent) => {
    setIsChecked(evt.target.checked);
    if (evt.target.checked) {
      dispatch(SET_RESPONSIBLE_NAME(patient_name));
      dispatch(SET_RESPONSIBLE_PHONE(patient_phone));
      dispatch(SET_RESPONSIBLE_ADDRESS(patient_address));
      dispatch(SET_RESPONSIBLE_RELATION("self"));
    } else {
      dispatch(SET_RESPONSIBLE_NAME(null));
      dispatch(SET_RESPONSIBLE_PHONE(null));
      dispatch(SET_RESPONSIBLE_ADDRESS(null));
      dispatch(SET_RESPONSIBLE_RELATION(null));
    }
  }

  return (<>
    <Card title="Penanggung Jawab" bordered={false}>
      <Checkbox className="select-none" checked={isChecked} onChange={handleResponsible}>
        Pasien Sendiri
      </Checkbox>
      <div className="mt-4 flex flex-col gap-1">
        <span className="font-bold">Nama</span>
        <Input
          showCount
          maxLength={50}
          value={responsible_name}
          onChange={(evt) => dispatch(SET_RESPONSIBLE_NAME(evt.target.value))}
          disabled={isChecked}
        />
      </div>
      <div className="mt-4 flex flex-col gap-1">
        <span className="font-bold">No Handphone</span>
        <Input
          showCount
          maxLength={15}
          value={responsible_phone}
          onChange={(evt) => dispatch(SET_RESPONSIBLE_PHONE(evt.target.value))}
          disabled={isChecked}
        />
      </div>
      <div className="mt-4 flex flex-col gap-1">
        <span className="font-bold">Hubungan Keluarga</span>
        <Select
          defaultValue={responsible_relation}
          value={responsible_relation}
          onChange={(evt) => dispatch(SET_RESPONSIBLE_RELATION(evt))}
          options={relationOptions}
          disabled={isChecked}
        />
      </div>
      <div className="mt-4 flex flex-col gap-1">
        <span className="font-bold">Alamat</span>
        <textarea
          maxLength={100}
          className="h-16 border rounded-lg overflow-hidden outline-none text-sm p-3"
          value={responsible_address === null ? "" : responsible_address}
          onChange={(evt) => dispatch(SET_RESPONSIBLE_ADDRESS(evt.target.value))}
          disabled={isChecked}
        />
      </div>
    </Card>
  </>);
}