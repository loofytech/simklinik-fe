import AppLayout from "@/layouts/AppLayout";
import { Card } from "antd";
import { useState } from "react";
import Inspection from "@/components/Inspection/Inspection";
import Measure from "@/components/Inspection/Measure";

export default function InspectionAction() {
  const [activeTab, setActiveTab] = useState<string>('inspection');

  const tabs = [
    {key: "inspection", label: "Pemeriksaan"},
    {key: "measure", label: "Tindakan"},
    {key: "recipe", label: "Resep"},
    {key: "radiology", label: "Radiologi"},
    {key: "laboratory", label: "Laboratorium"},
  ]

  const contentTabs: Record<string, React.ReactNode> = {
    inspection: <Inspection />,
    measure: <Measure />,
    recipe: <div></div>,
    radiology: <div></div>,
    laboratory: <div></div>,
  }

  return (<AppLayout>
    <Card title="Data Pasien" className="mb-5">
      <div className="grid grid-cols-6 gap-3">
        <div className="border-b pb-1">
          <div>Nama Pasien</div>
          <div className="mt-2 font-semibold text-lg">Agung Ardiyanto</div>
        </div>
        <div className="border-b pb-1">
          <div>Usia</div>
          <div className="mt-2 font-semibold text-lg">26 Tahun</div>
        </div>
        <div className="border-b pb-1">
          <div>Jenis Kelamin</div>
          <div className="mt-2 font-semibold text-lg">Laki - Laki</div>
        </div>
        <div className="border-b pb-1">
          <div>Nomor Rekam Medis</div>
          <div className="mt-2 font-semibold text-lg">00184500</div>
        </div>
        <div className="border-b pb-1">
          <div>Dokter</div>
          <div className="mt-2 font-semibold text-lg">dr. Angelina Bangun</div>
        </div>
        <div className="border-b pb-1">
          <div>Rencana Pembayaran</div>
          <div className="mt-2 font-semibold text-lg">BPJS Kesehatan</div>
        </div>
      </div>
    </Card>
    <Card
      tabList={tabs}
      activeTabKey={activeTab}
      onTabChange={(evt) => setActiveTab(evt)}
    >
      {contentTabs[activeTab]}
    </Card>
  </AppLayout>);
}