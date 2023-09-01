import { Card, Radio, Input, Modal, DatePicker, Select } from "antd";
import { CloseCircleOutlined, CloseCircleFilled } from "@ant-design/icons";
import type { RadioChangeEvent, DatePickerProps } from "antd";
import { truncate } from "@/utils/globalFunction";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import {
  SET_MEDICAL_RECORD,
  SET_PATIENT_NAME,
  SET_PATIENT_ADDRESS,
  SET_PATIENT_PHONE,
  SET_PATIENT_NIK,
  SET_PATIENT_GENDER,
  SET_BIRTH_PLACE,
  SET_BIRTH_DATE,
  SET_PROVINCE,
  SET_REGENCY,
  SET_DISTRICT,
  SET_SUBDISTRICT,
  SET_RELIGION,
  SET_ETHNIC,
  SET_MARITAL_STATUS,
  SET_JOB,
  SET_EDUCATION
} from "@/store/reducers/registration";

export default function FormPatient() {
  const { Search } = Input;
  const [searchPatient, setSearchPatient] = useState<boolean>(false);
  const [patientExist, setPatientExist] = useState<number>(0);
  const [regional, setRegional] = useState<boolean>(false);
  const [regionalResult, setRegionalResult] = useState<any>([]);
  const [searchRegional, setSearchRegional] = useState<string>("");

  const [jobs, setJobs] = useState<any>([
    {label: "Memilih Tidak Menjawab", value: "Memilih Tidak Menjawab"},
    {label: "Karyawan Swasta", value: "Karyawan Swasta"},
    {label: "Wirausahawan", value: "Wirausahawan"},
  ]);

  const [educations, setEducations] = useState<any>([
    {label: "Memilih Tidak Menjawab", value: "Memilih Tidak Menjawab"},
    {label: "SD", value: "SD"},
    {label: "SMP", value: "SMP"},
    {label: "SMA/SMK", value: "SMA/SMK"},
    {label: "D3", value: "D3"},
    {label: "S1", value: "S1"},
    {label: "S2", value: "S2"},
    {label: "S3", value: "S3"},
  ]);

  const [religions, setReligions] = useState<any>([
    {label: "Islam", value: "Islam"},
    {label: "Kristen", value: "Kristen"},
    {label: "Budha", value: "Budha"},
    {label: "Konghucu", value: "Konghucu"},
  ]);

  const [ethnics, setEthnics] = useState<any>([
    {label: "Memilih Tidak Menjawab", value: "Memilih Tidak Menjawab"},
    {label: "Jawa", value: "Jawa"},
    {label: "Sunda", value: "Sunda"},
    {label: "Baduy", value: "Baduy"},
  ]);

  const [maritalStatuses, setMaritalStatuses] = useState<any>([
    {label: "Memilih Tidak Menjawab", value: "Memilih Tidak Menjawab"},
    {label: "Menikah", value: "Menikah"},
    {label: "Belum Menikah", value: "Belum Menikah"},
    {label: "Menjanda", value: "Menjanda"},
    {label: "Menduda", value: "Menduda"},
  ]);

  const bloodOptions = [
    {label: "A", value: "A"},
    {label: "B", value: "B"},
    {label: "AB", value: "AB"}
  ];

  const [localRegional, setLocalRegional] = useState<any>({
    province: null,
    regency: null,
    district: null,
    subDistrict: null
  });
  
  const {
    medical_record,
    patient_name,
    patient_address,
    patient_phone,
    patient_nik,
    patient_gender,
    birth_place,
    birth_date,
    religion_id,
    education_id,
    job_id,
    ethnic_id,
    marital_status,
  } = useSelector((state: any) => state.registration);
  const dispatch = useDispatch();

  const handlePatientExist = (evt: RadioChangeEvent) => {
    setPatientExist(evt.target.value);
    if (evt.target.value == 0) {
      dispatch(SET_MEDICAL_RECORD(null));
    }
  }

  const handleSearch = async () => {
    setSearchPatient(true);
    const request = await fetch("/api/patient", {
      method: "POST",
      body: JSON.stringify({medical_record: medical_record})
    });
    if ([200, 201].includes(request.status)) {
      const {data} = await request.json();
      if (data) {
        // console.log(data);
        dispatch(SET_MEDICAL_RECORD(data.medical_record));
        dispatch(SET_PATIENT_NAME(data.patient_name));
        dispatch(SET_PATIENT_PHONE(data.patient_phone));
        dispatch(SET_PATIENT_NIK(data.patient_nik));
        dispatch(SET_BIRTH_PLACE(data.birth_place));
        dispatch(SET_BIRTH_DATE(data.birth_date));
        dispatch(SET_PATIENT_ADDRESS(data.address));
        dispatch(SET_RELIGION(data.religion));
        dispatch(SET_PATIENT_GENDER(data.patient_gender));
        dispatch(SET_ETHNIC(data.ethnic));
        dispatch(SET_MARITAL_STATUS(data.marital_status));
        dispatch(SET_JOB(data.job));
        dispatch(SET_EDUCATION(data.education));
      }
    }
    await setSearchPatient(false);
  }

  const handleInputPatientDate: DatePickerProps['onChange'] = (date, dateString) => {
    dispatch(SET_BIRTH_DATE(dateString));
  }

  const showRegional = async () => {
    setRegional(true);

    if (!localRegional.province) {
      return requestProvince();
    }
    if (!localRegional.regency) {
      return requestRegency(localRegional.province.id);
    }
    if (!localRegional.district) {
      return requestDistrict(localRegional.regency.id);
    }
    if (!localRegional.subDistrict) {
      return requestSubDistrict(localRegional.district.id);
    }

    return requestSubDistrict(localRegional.district.id);
  }

  const handleEraseRegional = (param: string) => {
    if (param == "province") {
      dispatch(SET_PROVINCE(null));
      dispatch(SET_REGENCY(null));
      dispatch(SET_DISTRICT(null));
      dispatch(SET_SUBDISTRICT(null));
    }
    if (param == "regency") {
      dispatch(SET_REGENCY(null));
      dispatch(SET_DISTRICT(null));
      dispatch(SET_SUBDISTRICT(null));
    }
    if (param == "district") {
      dispatch(SET_DISTRICT(null));
      dispatch(SET_SUBDISTRICT(null));
    }
    if (param == "subDistrict") {
      dispatch(SET_SUBDISTRICT(null));
    }
  }

  const handleRegional = (param: any, idn: string) => {
    setRegionalResult(null);

    if (idn == "province") {
      requestRegency(param.id);
      dispatch(SET_PROVINCE(param));
    }
    if (idn == "regency") {
      requestDistrict(param.id);
      dispatch(SET_REGENCY(param));
    }
    if (idn == "district") {
      requestSubDistrict(param.id);
      dispatch(SET_DISTRICT(param));
    }
    if (idn == "subDistrict") {
      setRegional(false);
      dispatch(SET_SUBDISTRICT(param));
    }

    return setLocalRegional((prevState: any) => ({
      ...prevState,
      [idn]: param
    }));
  }

  // const fetchReligion = async () => {
  //   const request = await fetch("/api/religion");
  //   if ([200, 201].includes(request.status)) {
  //     const response = await request.json();
  //     let data: any = [];
  //     if (response.data.length > 0) response.data.map((dtl: any) => {
  //       data.push({label: dtl.religion_name, value: dtl.id});
  //     });
  //     return setReligions(data);
  //   }
  // }

  // const fetchEthnic = async () => {
  //   const request = await fetch("/api/ethnic");
  //   if ([200, 201].includes(request.status)) {
  //     const response = await request.json();
  //     let data: any = [];
  //     if (response.data.length > 0) response.data.map((dtl: any) => {
  //       data.push({label: dtl.ethnic_name, value: dtl.id});
  //     });
  //     return setEthnics(data);
  //   }
  // }

  // const fetchMaritalStatus = async () => {
  //   const request = await fetch("/api/marital-status");
  //   if ([200, 201].includes(request.status)) {
  //     const response = await request.json();
  //     let data: any = [];
  //     if (response.data.length > 0) response.data.map((dtl: any) => {
  //       data.push({label: dtl.marital_name, value: dtl.id});
  //     });
  //     return setMaritalStatuses(data);
  //   }
  // }

  // const fetchJob = async () => {
  //   const request = await fetch("/api/job");
  //   if ([200, 201].includes(request.status)) {
  //     const response = await request.json();
  //     let data: any = [];
  //     if (response.data.length > 0) response.data.map((dtl: any) => {
  //       data.push({label: dtl.job_name, value: dtl.id});
  //     });
  //     return setJobs(data);
  //   }
  // }

  // const fetchEducation = async () => {
  //   const request = await fetch("/api/education");
  //   if ([200, 201].includes(request.status)) {
  //     const response = await request.json();
  //     let data: any = [];
  //     if (response.data.length > 0) response.data.map((dtl: any) => {
  //       data.push({label: dtl.education_name, value: dtl.id});
  //     });
  //     return setEducations(data);
  //   }
  // }

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

  useEffect(() => {
    // fetchReligion();
    // fetchEthnic();
    // fetchMaritalStatus();
    // fetchJob();
    // fetchEducation();
  }, []);

  return (<>
    <Card title="Data Pasien" bordered={false}>
      <div className="flex mb-8 gap-5">
        <span className="font-bold select-none">Daftar Sebagai</span>
        <Radio.Group className="select-none" onChange={handlePatientExist} value={patientExist}>
          <Radio value={0}>Pasien Baru</Radio>
          <Radio value={1}>Pasien Lama</Radio>
        </Radio.Group>
      </div>
      <Search
        placeholder="Cari NO. RM"
        enterButton={"Cari Pasien"}
        size="large"
        className="search-patient"
        onPressEnter={handleSearch}
        onChange={(evt) => dispatch(SET_MEDICAL_RECORD(evt.target.value))}
        value={medical_record}
        disabled={searchPatient || patientExist == 0}
        loading={searchPatient}
      />
      <div className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="font-bold">Nama Pasien</span>
          <Input
            id="patient_name"
            showCount
            maxLength={50}
            value={patient_name}
            autoComplete="off"
            onChange={(evt) => dispatch(SET_PATIENT_NAME(evt.target.value))}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-bold">No Handphone</span>
            <Input
              showCount
              maxLength={15}
              value={patient_phone}
              onChange={(evt) => dispatch(SET_PATIENT_PHONE(evt.target.value))}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-bold">Nomor Induk Kependudukan (NIK)</span>
            <Input
              showCount
              maxLength={20}
              value={patient_nik}
              onChange={(evt) => dispatch(SET_PATIENT_NIK(evt.target.value))}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-bold">Tempat Lahir</span>
            <Input
              showCount
              maxLength={50}
              value={birth_place}
              onChange={(evt) => dispatch(SET_BIRTH_PLACE(evt.target.value))}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-bold">Tanggal Lahir</span>
            <DatePicker
              placeholder=""
              format={"YYYY-MM-DD"}
              defaultValue={birth_date}
              value={dayjs(birth_date)}
              onChange={handleInputPatientDate}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-bold">Alamat</span>
          <textarea
            className="h-16 border rounded-lg overflow-hidden outline-none text-sm p-3"
            maxLength={100}
            value={patient_address === null ? "" : patient_address}
            onChange={(evt) => dispatch(SET_PATIENT_ADDRESS(evt.target.value))}
          />
        </div>
        {/* Province, Regency, District, Subdistrict */}
        <div className="flex flex-col gap-1">
          <span className="font-bold">Provinsi, Kabupaten, Kecamatan, Kelurahan</span>
          <div className="i-pkck">
            <div className="absolute left-0 top-0 right-0 bottom-0" onClick={showRegional}></div>
            <div className="flex gap-1 h-full absolute top-0">
              {localRegional.province && (
                <div className="text-xs bg-primary flex items-center gap-1 pl-2 rounded">
                  <div className="select-none text-white">{truncate(localRegional.province.name)}</div>
                  <div className="flex items-center pl-1 pr-2 h-full">
                    <button className="flex text-white" onClick={() => handleEraseRegional("province")}><CloseCircleFilled style={{fontSize: 16}} /></button>
                  </div>
                </div>
              )}
              {localRegional.regency && (
                <div className="text-xs bg-primary flex items-center gap-1 pl-2 rounded">
                  <div className="select-none text-white uppercase">{truncate(localRegional.regency.name)}</div>
                  <div className="flex items-center pl-1 pr-2 h-full">
                    <button className="flex text-white" onClick={() => handleEraseRegional("regency")}><CloseCircleFilled style={{fontSize: 16}} /></button>
                  </div>
                </div>
              )}
              {localRegional.district && (
                <div className="text-xs bg-primary flex items-center gap-1 pl-2 rounded">
                  <div className="select-none text-white uppercase">{truncate(localRegional.district.name)}</div>
                  <div className="flex items-center pl-1 pr-2 h-full">
                    <button className="flex text-white" onClick={() => handleEraseRegional("district")}><CloseCircleFilled style={{fontSize: 16}} /></button>
                  </div>
                </div>
              )}
              {localRegional.subDistrict && (
                <div className="text-xs bg-primary flex items-center gap-1 pl-2 rounded">
                  <div className="select-none text-white uppercase">{truncate(localRegional.subDistrict.name)}</div>
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
                    if (!localRegional.province) {
                      return handleRegional(dxd, "province")
                    }
                    if (!localRegional.regency) {
                      return handleRegional(dxd, "regency")
                    }
                    if (!localRegional.district) {
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
          {/* <div className="flex flex-col gap-1">
            <span className="font-bold">Golongan Darah</span>
            <Select
              defaultValue={patient_blood_type}
              onChange={(value) => dispatch(SET_PATIENT_BLOOD_TYPE(value))}
              allowClear
              options={bloodOptions}
            />
          </div> */}
          <div className="flex flex-col gap-1">
            <span className="font-bold">Agama</span>
            <Select
              defaultValue={religion_id}
              value={religion_id}
              onChange={(value) => dispatch(SET_RELIGION(value))}
              allowClear
              options={religions}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-bold">Jenis Kelamin</span>
            <Select
              defaultValue={patient_gender}
              value={patient_gender}
              onChange={(value) => dispatch(SET_PATIENT_GENDER(value))}
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
              defaultValue={ethnic_id}
              value={ethnic_id}
              onChange={(value) => dispatch(SET_ETHNIC(value))}
              allowClear
              options={ethnics}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-bold">Status Pernikahan</span>
            <Select
              defaultValue={marital_status}
              value={marital_status}
              onChange={(value) => dispatch(SET_MARITAL_STATUS(value))}
              allowClear
              options={maritalStatuses}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-bold">Pekerjaan</span>
          <Select
            defaultValue={job_id}
            value={job_id}
            onChange={(value) => dispatch(SET_JOB(value))}
            allowClear
            options={jobs}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-bold">Pendidikan Terakhir</span>
          <Select
            defaultValue={education_id}
            value={education_id}
            onChange={(value) => dispatch(SET_EDUCATION(value))}
            allowClear
            options={educations}
          />
        </div>
      </div>
    </Card>
  </>);
}