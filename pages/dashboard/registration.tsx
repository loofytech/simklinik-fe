import { useEffect, useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import { Card, Radio, Checkbox, Input, Form, Select, DatePicker, Modal, Button } from "antd";
import type { RadioChangeEvent, DatePickerProps } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { CloseCircleOutlined, CloseCircleFilled, LoadingOutlined } from "@ant-design/icons";
import { truncate } from "@/utils/globalFunction";

export default function Registration() {
  const { Search } = Input;
  const [regional, setRegional] = useState<boolean>(false);
  const [searchRegional, setSearchRegional] = useState<string>("");
  const [regionalResult, setRegionalResult] = useState<any>(null);

  const [search, setSearch] = useState<boolean>(false);
  const [payment, setPayment] = useState<number>(0);
  const [patientNew, setPatientNew] = useState<number>(0);

  const [submitRegistration, setSubmitRegistration] = useState<boolean>(false);

  const [inputResponsible, setInputResponsible] = useState<any>({
    self: false,
    name: "",
    phone: "",
    address: "",
    relation: ""
  });
  const [inputService, setInputService] = useState<any>({
    service: "",
    unit: "",
    doctor: ""
  });
  const [inputPatient, setInputPatient] = useState<any>({
    name: "",
    phone: "",
    nik: "",
    place_of_birth: "",
    date_of_birth: "",
    address: "",
    blood: "",
    religion: "",
    gender: "",
    ethnic: "",
    marital_status: "",
    job: "",
    last_education: ""
  });
  const [inputPatientRegional, setInputPatientRegional] = useState<any>({
    province: null,
    regency: null,
    district: null,
    subDistrict: null
  });

  const showModal = async () => {
    setRegional(true);

    if (!inputPatientRegional.province) {
      return requestProvince();
    }
    if (!inputPatientRegional.regency) {
      return requestRegency(inputPatientRegional.province.id);
    }
    if (!inputPatientRegional.district) {
      return requestDistrict(inputPatientRegional.regency.id);
    }
    if (!inputPatientRegional.subDistrict) {
      return requestSubDistrict(inputPatientRegional.district.id);
    }

    return requestSubDistrict(inputPatientRegional.district.id);
  }

  const relationOptions = [
    {label: "Suami", value: 1},
    {label: "Istri", value: 2},
    {label: "Anak", value: 3},
    {label: "Kakak", value: 4},
    {label: "Adik", value: 5},
    {label: "Paman", value: 6},
    {label: "Bibi", value: 7}
  ];
  const serviceOptions = [
    {label: "Pemeriksaan Umum", value: 1}
  ];
  const bloodOptions = [
    {label: "A", value: 1},
    {label: "B", value: 1},
    {label: "AB", value: 1}
  ];

  const requestProvince = async () => {
    const http = await fetch(process.env.NEXT_PUBLIC_GO_API + "/provinsi", {
      headers: {
        "X-API-KEY": process.env.NEXT_PUBLIC_GO_API_KEY || ""
      }
    });
    const response = await http.json();

    return setRegionalResult(response.data);
  }

  const requestRegency = async (param: string) => {
    const http = await fetch(process.env.NEXT_PUBLIC_GO_API + "/kota?provinsi_id=" + param, {
      headers: {
        "X-API-KEY": process.env.NEXT_PUBLIC_GO_API_KEY || ""
      }
    });
    const response = await http.json();

    return setRegionalResult(response.data);
  }

  const requestDistrict = async (param: string) => {
    const http = await fetch(process.env.NEXT_PUBLIC_GO_API + "/kecamatan?kota_id=" + param, {
      headers: {
        "X-API-KEY": process.env.NEXT_PUBLIC_GO_API_KEY || ""
      }
    });
    const response = await http.json();

    return setRegionalResult(response.data);
  }

  const requestSubDistrict = async (param: string) => {
    const http = await fetch(process.env.NEXT_PUBLIC_GO_API + "/kelurahan?kecamatan_id=" + param, {
      headers: {
        "X-API-KEY": process.env.NEXT_PUBLIC_GO_API_KEY || ""
      }
    });
    const response = await http.json();

    return setRegionalResult(response.data);
  }

  const handlePaymentChange = (evt: RadioChangeEvent) => {
    setPayment(evt.target.value);
  }

  const handlePatientNewChange = (evt: RadioChangeEvent) => {
    setPatientNew(evt.target.value);
  }

  const handleResponsible = (evt: CheckboxChangeEvent) => {
    setInputResponsible((prevState: any) => ({
      ...prevState,
      self: !inputResponsible.self
    }));
  }

  const handleInputResponsible = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
    setInputResponsible((prevState: any) => ({
      ...prevState,
      [name]: evt.target.value
    }));
  }

  const handleSearch = () => {
    setSearch(true);
    setTimeout(() => setSearch(false), 3000);
  }

  const handleInputPatient = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
    setInputPatient((prevState: any) => ({
      ...prevState,
      [name]: evt.target.value
    }));
  }

  const handleInputPatientDate: DatePickerProps['onChange'] = (date, dateString) => {
    setInputPatient((prevState: any) => ({
      ...prevState,
      date_of_birth: dateString
    }));
  }

  const handleRegional = (param: any, idn: string) => {
    setRegionalResult(null);

    if (idn == "province") {
      requestRegency(param.id);
    }
    if (idn == "regency") {
      requestDistrict(param.id);
    }
    if (idn == "district") {
      requestSubDistrict(param.id);
    }
    if (idn == "subDistrict") {
      setRegional(false);
    }

    return setInputPatientRegional((prevState: any) => ({
      ...prevState,
      [idn]: param
    }));
  }

  const handleEraseRegional = (param: string) => {
    if (param == "province") {
      setInputPatientRegional((prevState: any) => ({
        ...prevState,
        province: null,
        regency: null,
        district: null,
        subDistrict: null
      }));
    }
    if (param == "regency") {
      setInputPatientRegional((prevState: any) => ({
        ...prevState,
        regency: null,
        district: null,
        subDistrict: null
      }));
    }
    if (param == "district") {
      setInputPatientRegional((prevState: any) => ({
        ...prevState,
        district: null,
        subDistrict: null
      }));
    }
    if (param == "subDistrict") {
      setInputPatientRegional((prevState: any) => ({
        ...prevState,
        subDistrict: null
      }));
    }
  }

  const [religions, setReligions] = useState<any>([]);
  const [ethnics, setEthnics] = useState<any>([]);
  const [maritalStatuses, setMaritalStatuses] = useState<any>([]);
  const [religion, setReligion] = useState<any>(null);
  const [gender, setGender] = useState<any>(null);
  const [ethnic, setEthnic] = useState<any>(null);
  const [maritalStatus, setMaritalStatus] = useState<any>(null);

  const fetchReligion = async () => {
    const request = await fetch("/api/religion");
    if ([200, 201].includes(request.status)) {
      const response = await request.json();
      let data: any = [];
      if (response.data.length > 0) response.data.map((dtl: any) => {
        data.push({label: dtl.religion_name, value: dtl.id});
      });
      return setReligions(data);
    }
  }

  const fetchEthnic = async () => {
    const request = await fetch("/api/ethnic");
    if ([200, 201].includes(request.status)) {
      const response = await request.json();
      let data: any = [];
      if (response.data.length > 0) response.data.map((dtl: any) => {
        data.push({label: dtl.ethnic_name, value: dtl.id});
      });
      return setEthnics(data);
    }
  }

  useEffect(() => {
    fetchReligion();
    fetchEthnic();
  }, []);

  return (<AppLayout>
    <div className="grid grid-cols-2 gap-6">
      {/* Data Pasien */}
      <Card title="Data Pasien" bordered={false}>
        <div className="flex mb-8 gap-5">
          <span className="font-bold select-none">Daftar Sebagai</span>
          <Radio.Group className="select-none" onChange={handlePatientNewChange} value={patientNew}>
            <Radio value={0}>Pasien Baru</Radio>
            <Radio value={1}>Pasien Lama</Radio>
          </Radio.Group>
        </div>
        <Search
          placeholder="Cari NO. RM"
          enterButton={"Cari Pasien"}
          size="large"
          className="search-patient"
          // onClick={handleSearch}
          onPressEnter={handleSearch}
          disabled={search || patientNew == 0}
          loading={search}
        />
        <div className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-bold">Nama Pasien</span>
            <Input
              showCount
              maxLength={50}
              value={inputPatient.name}
              onChange={(evt) => handleInputPatient(evt, "name")}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-bold">No Handphone</span>
              <Input
                showCount
                maxLength={15}
                value={inputPatient.phone}
                onChange={(evt) => handleInputPatient(evt, "phone")}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold">Nomor Induk Kependudukan (NIK)</span>
              <Input
                showCount
                maxLength={20}
                value={inputPatient.nik}
                onChange={(evt) => handleInputPatient(evt, "nik")}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-bold">Tempat Lahir</span>
              <Input
                showCount
                maxLength={50}
                value={inputPatient.place_of_birth}
                onChange={(evt) => handleInputPatient(evt, "place_of_birth")}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold">Tanggal Lahir</span>
              <DatePicker placeholder="" onChange={handleInputPatientDate} />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-bold">Alamat</span>
            {/* <TextArea
              maxLength={100}
              value={inputPatient.address}
              onChange={(evt) => handleInputPatient(evt, "address")}
            /> */}
          </div>
          {/* Province, Regency, District, Subdistrict */}
          <div className="flex flex-col gap-1">
            <span className="font-bold">Provinsi, Kabupaten, Kecamatan, Kelurahan</span>
            <div className="i-pkck">
              <div className="absolute left-0 top-0 right-0 bottom-0" onClick={showModal}></div>
              <div className="flex gap-1 h-full absolute top-0">
                {inputPatientRegional.province && (
                  <div className="text-xs bg-primary flex items-center gap-1 pl-2 rounded">
                    <div className="select-none text-white">{truncate(inputPatientRegional.province.name)}</div>
                    <div className="flex items-center pl-1 pr-2 h-full">
                      <button className="flex text-white" onClick={() => handleEraseRegional("province")}><CloseCircleFilled style={{fontSize: 16}} /></button>
                    </div>
                  </div>
                )}
                {inputPatientRegional.regency && (
                  <div className="text-xs bg-primary flex items-center gap-1 pl-2 rounded">
                    <div className="select-none text-white uppercase">{truncate(inputPatientRegional.regency.name)}</div>
                    <div className="flex items-center pl-1 pr-2 h-full">
                      <button className="flex text-white" onClick={() => handleEraseRegional("regency")}><CloseCircleFilled style={{fontSize: 16}} /></button>
                    </div>
                  </div>
                )}
                {inputPatientRegional.district && (
                  <div className="text-xs bg-primary flex items-center gap-1 pl-2 rounded">
                    <div className="select-none text-white uppercase">{truncate(inputPatientRegional.district.name)}</div>
                    <div className="flex items-center pl-1 pr-2 h-full">
                      <button className="flex text-white" onClick={() => handleEraseRegional("district")}><CloseCircleFilled style={{fontSize: 16}} /></button>
                    </div>
                  </div>
                )}
                {inputPatientRegional.subDistrict && (
                  <div className="text-xs bg-primary flex items-center gap-1 pl-2 rounded">
                    <div className="select-none text-white uppercase">{truncate(inputPatientRegional.subDistrict.name)}</div>
                    <div className="flex items-center pl-1 pr-2 h-full">
                      <button className="flex text-white" onClick={() => handleEraseRegional("subDistrict")}><CloseCircleFilled style={{fontSize: 16}} /></button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Modal
              className="modal-regional"
              title="Provinsi, Kabupaten, Kecamatan, Kelurahan"
              centered
              footer={null}
              open={regional}
              closeIcon={<CloseCircleOutlined onClick={() => setRegional(false)} />}
            >
              <div className="px-6">
                <Input
                  showCount
                  maxLength={50}
                  value={searchRegional}
                  onChange={(evt) => setSearchRegional(evt.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 mt-3 overflow-auto" style={{maxHeight: 300}}>
                {regionalResult && regionalResult.map((dxd: any, ins: number) => {
                  return <div
                    key={ins}
                    className="px-6 py-1 cursor-pointer select-none hover:bg-primary hover:text-white"
                    onClick={() => {
                      if (!inputPatientRegional.province) {
                        return handleRegional(dxd, "province")
                      }
                      if (!inputPatientRegional.regency) {
                        return handleRegional(dxd, "regency")
                      }
                      if (!inputPatientRegional.district) {
                        return handleRegional(dxd, "district")
                      }

                      return handleRegional(dxd, "subDistrict")
                    }}
                  >
                    {dxd.name}
                  </div>
                })}
              </div>
            </Modal>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-bold">Golongan Darah</span>
              <Select
                value={inputPatient.blood}
                // onChange={(evt) => handleInputResponsible(evt, "relation")}
                allowClear
                options={bloodOptions}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold">Agama</span>
              <Select
                defaultValue={religion}
                onChange={(value) => setReligion(value)}
                allowClear
                options={religions}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold">Jenis Kelamin</span>
              <Select
                defaultValue={gender}
                onChange={(value) => setGender(value)}
                allowClear
                options={[
                  {label: "Laki - Laki", value: "L"},
                  {label: "Perempuan", value: "P"}
                ]}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold">Suku</span>
              <Select
                defaultValue={ethnic}
                onChange={(value) => setEthnic(value)}
                allowClear
                options={ethnics}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-bold">Status Pernikahan</span>
            <Select
              defaultValue={inputPatient.blood}
              // onChange={(evt) => handleInputResponsible(evt, "relation")}
              allowClear
              options={bloodOptions}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-bold">Pekerjaan</span>
            <Select
              defaultValue={inputPatient.blood}
              // onChange={(evt) => handleInputResponsible(evt, "relation")}
              allowClear
              options={bloodOptions}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-bold">Pendidikan Terakhir</span>
            <Select
              defaultValue={inputPatient.blood}
              // onChange={(evt) => handleInputResponsible(evt, "relation")}
              allowClear
              options={bloodOptions}
            />
          </div>
        </div>
      </Card>
      <div className="flex flex-col gap-6">
        {/* Rencana Pembayaran */}
        <Card title="Rencana Pembayaran" bordered={false}>
          <Radio.Group className="select-none" onChange={handlePaymentChange} value={payment}>
            <Radio value={1}>Bayar Sendiri</Radio>
            <Radio value={2}>Asuransi</Radio>
          </Radio.Group>
          {/* <div>asd</div> */}
        </Card>
        {/* Penanggung Jawab */}
        <Card title="Penanggung Jawab" bordered={false}>
          <Checkbox className="select-none" checked={inputResponsible.self} onChange={handleResponsible}>
            Pasien Sendiri
          </Checkbox>
          <div className="mt-4 flex flex-col gap-1">
            <span className="font-bold">Nama</span>
            <Input
              showCount
              maxLength={50}
              value={inputResponsible.name}
              onChange={(evt) => handleInputResponsible(evt, "name")}
              disabled={inputResponsible.self}
            />
          </div>
          <div className="mt-4 flex flex-col gap-1">
            <span className="font-bold">No Handphone</span>
            <Input
              showCount
              maxLength={15}
              value={inputResponsible.phone}
              onChange={(evt) => handleInputResponsible(evt, "phone")}
              disabled={inputResponsible.self}
            />
          </div>
          <div className="mt-4 flex flex-col gap-1">
            <span className="font-bold">Hubungan Keluarga</span>
            <Select
              defaultValue={inputResponsible.relation}
              // onChange={(evt) => handleInputResponsible(evt, "relation")}
              allowClear
              options={relationOptions}
            />
          </div>
          <div className="mt-4 flex flex-col gap-1">
            <span className="font-bold">Alamat</span>
            {/* <TextArea
              // showCount
              maxLength={100}
              value={inputResponsible.address}
              onChange={(evt) => handleInputResponsible(evt, "address")}
              disabled={inputResponsible.self}
            /> */}
          </div>
        </Card>
        {/* Pelayanan Klinik */}
        <Card title="Pelayanan Klinik" bordered={false}>
          <div className="flex flex-col gap-1">
            <span className="font-bold">Layanan</span>
            <Select
              defaultValue={inputService.service}
              // onChange={(evt) => handleInputResponsible(evt, "relation")}
              allowClear
              options={serviceOptions}
            />
          </div>
          <div className="mt-4 flex flex-col gap-1">
            <span className="font-bold">Unit</span>
            <Select
              defaultValue={inputService.service}
              // onChange={(evt) => handleInputResponsible(evt, "relation")}
              allowClear
              options={serviceOptions}
            />
          </div>
          <div className="mt-4 flex flex-col gap-1">
            <span className="font-bold">Dokter</span>
            <Select
              defaultValue={inputService.service}
              // onChange={(evt) => handleInputResponsible(evt, "relation")}
              allowClear
              options={serviceOptions}
            />
          </div>
        </Card>
        <div className="grid grid-cols-1 gap-4">
          <button
            type="button"
            className="bg-primary flex justify-center items-center gap-2 text-white font-bold py-2 rounded disabled:bg-blue-400"
            onClick={() => setSubmitRegistration(true)}
            disabled={submitRegistration}
          >
            {submitRegistration && <LoadingOutlined style={{fontSize: 16}} />}
            <span>Submit Pendaftaran</span>
          </button>
        </div>
      </div>
    </div>
  </AppLayout>);
}