import { Card, Radio, Select, Input } from "antd";
import type { RadioChangeEvent } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SET_PAYMENT_ID } from "@/store/reducers/registration";

export default function FormPayment() {
  const [payment, setPayment] = useState<number>(0);
  const [insurance, setInsurance] = useState<any>(null);
  const [noInsurance, setNoInsurance] = useState<string>("");
  const [insurances, setInsurances] = useState<any>([]);
  const dispatch = useDispatch();

  const handlePaymentChange = (evt: RadioChangeEvent) => {
    setPayment(evt.target.value);
    dispatch(SET_PAYMENT_ID(evt.target.value));
    // setInsurance(null);
    // setNoInsurance("");
    // if (evt.target.value == 2) {
    //   getInsurance();
    // }
  }
  
  const getInsurance = async () => {
    const request = await fetch("/api/insurance-product");
    if ([200, 201].includes(request.status)) {
      const response = await request.json();
      let data: any = [];
      if (response.data.length > 0) response.data.map((dtl: any) => {
        data.push({label: dtl.insurance_product_name, value: dtl.id});
      });
      return setInsurances(data);
    }
  }

  return (<>
    <Card title="Rencana Pembayaran" bordered={false}>
      <Radio.Group className="select-none" onChange={handlePaymentChange} value={payment}>
        <Radio value={1}>Bayar Sendiri</Radio>
        <Radio value={2}>Asuransi</Radio>
      </Radio.Group>
      {payment == 2 && <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="mb-3 md:mb-0 flex flex-col gap-1.5">
          <label className="font-bold">Pilih Asuransi</label>
          <Select
            defaultValue={insurance}
            onChange={(value) => setInsurance(value)}
            options={insurances}
          />
        </div>
        <div className="mb-3 md:mb-0 flex flex-col gap-1.5">
          <label className="font-bold">No Asuransi</label>
          <Input
            id="no_insurance"
            showCount
            maxLength={50}
            value={noInsurance}
            onChange={(evt) => setNoInsurance(evt.target.value)}
          />
        </div>
      </div>}
    </Card>
  </>);
}