import { useEffect, useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import FormPatient from "@/components/Registration/FormPatient";
import FormPayment from "@/components/Registration/FormPayment";
import FormResponsible from "@/components/Registration/FormResponsible";
import FormService from "@/components/Registration/FormService";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { notification } from "antd";

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export default function Registration() {
  const [api, contextHolder] = notification.useNotification();
  const [submitRegistration, setSubmitRegistration] = useState<boolean>(false);

  const openNotificationWithIcon = (type: NotificationType, message: string) => {
    api[type]({
      message: 'Registrasi Notifikasi',
      description: message,
    });
  }

  const {
    medical_record,
    patient_name,
    patient_address,
    patient_phone,
    patient_nik,
    patient_gender,
    patient_blood_type,
    birth_place,
    birth_date,
    province,
    regency,
    district,
    sub_district,
    job_id,
    ethnic_id,
    religion_id,
    education_id,
    marital_status,
    responsible_name,
    responsible_phone,
    responsible_address,
    responsible_relation,
    service_id,
    unit_id,
    user_id
  } = useSelector((state: any) => state.registration);

  const postRegistration = async () => {
    setSubmitRegistration(true);
    const request = await fetch("/api/registration", {
      method: "POST",
      body: JSON.stringify({
        medical_record: medical_record,
        patient_name: patient_name,
        patient_address: patient_address,
        patient_phone: patient_phone,
        patient_nik: patient_nik,
        birth_place: birth_place,
        birth_date: birth_date,
        patient_gender: patient_gender,
        patient_blood_type: patient_blood_type,
        province: province?.name,
        regency: regency?.name,
        district: district?.name,
        sub_district: sub_district?.name,
        job_id: job_id,
        ethnic_id: ethnic_id,
        religion_id: religion_id,
        education_id: education_id,
        marital_status: marital_status,
        responsible_name: responsible_name,
        responsible_phone: responsible_phone,
        responsible_address: responsible_address,
        responsible_relation: responsible_relation,
        service_id: service_id,
        unit_id: unit_id,
        user_id: user_id
      })
    });
    if ([200, 201].includes(request.status)) {
      const response = await request.json();
      setSubmitRegistration(false);
      openNotificationWithIcon("success", "Registrasi pasien telah berhasil dilakukan");
      setTimeout(() => {
        return location.reload();
      }, 3000);
    } else {
      setSubmitRegistration(false);
      openNotificationWithIcon("error", "");
    }
  }

  return (<AppLayout>
    <div className="grid grid-cols-2 gap-6">
      {/* Data Pasien */}
      <FormPatient />
      <div className="flex flex-col gap-6">
        {/* Rencana Pembayaran */}
        <FormPayment />
        {/* Penanggung Jawab */}
        <FormResponsible />
        {/* Pelayanan Klinik */}
        <FormService />
        <div className="grid grid-cols-1 gap-4">
          <button
            type="button"
            className="bg-primary flex justify-center items-center gap-2 text-white font-bold py-2 rounded disabled:bg-blue-400"
            onClick={postRegistration}
            disabled={submitRegistration}
          >
            {submitRegistration && <LoadingOutlined style={{fontSize: 16}} />}
            <span>Submit Pendaftaran</span>
          </button>
        </div>
      </div>
    </div>
    {contextHolder}
  </AppLayout>);
}