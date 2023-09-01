import Screening from "@/components/Screening";
import AppLayout from "@/layouts/AppLayout";
import { Card } from "antd";
import { useState, useEffect } from "react";
import { calculateAge } from "@/utils/globalFunction";

export default function ScreeningAction(context: any) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (context.data) {
      // console.log(context.data);
      setData(context.data);
    }
  }, []);

  return (<AppLayout>
    <Card title="Data Pasien" className="mb-5">
      <div className="grid grid-cols-6 gap-3">
        <div className="border-b pb-1">
          <div>Nama Pasien</div>
          <div className="mt-2 font-semibold text-lg">{data?.registration?.patient?.patient_name}</div>
        </div>
        <div className="border-b pb-1">
          <div>Usia</div>
          <div className="mt-2 font-semibold text-lg">{calculateAge(data?.registration?.patient?.birth_date)} Tahun</div>
        </div>
        <div className="border-b pb-1">
          <div>Jenis Kelamin</div>
          <div className="mt-2 font-semibold text-lg">{data?.registration?.patient?.patient_gender == "L" ? "Laki - Laki" : "Perempuan"}</div>
        </div>
        <div className="border-b pb-1">
          <div>Nomor Rekam Medis</div>
          <div className="mt-2 font-semibold text-lg">{data?.registration?.patient?.medical_record}</div>
        </div>
        <div className="border-b pb-1">
          <div>Dokter</div>
          <div className="mt-2 font-semibold text-lg">{data?.registration?.doctor?.name}</div>
        </div>
        <div className="border-b pb-1">
          <div>Rencana Pembayaran</div>
          <div className="mt-2 font-semibold text-lg">-</div>
        </div>
      </div>
    </Card>
    <Card className="pt-4">
      <Screening data={data} />
    </Card>
  </AppLayout>);
}

export async function getServerSideProps(context: any) {
  const param = context.query.code;
  const request = await fetch(process.env.BASE_URL_API + "/screening", {
    method: "POST",
    body: JSON.stringify({
      screening_id: param
    })
  });

  if ([200, 201].includes(request.status)) {
    const data = await request.json();
    return {
      props: data
    }
  }

  return {
    props: {
      data: null
    }
  }
}