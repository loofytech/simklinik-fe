import { BiDesktop, BiSpreadsheet, BiBox, BiFirstAid } from "react-icons/bi";

export const items = [
  {
    icon: <BiDesktop size={20} />,
    label: "Dashboard",
    path: "/dashboard",
    children: null
  },
  {
    icon: <BiSpreadsheet size={20} />,
    label: "Pendaftaran",
    path: "/dashboard/registration",
    children: null
  },
  {
    icon: <BiBox size={20} />,
    label: "Data Master",
    path: null,
    children: [
      {
        label: "Role",
        path: "/dashboard/masterdata/role"
      },
      {
        label: "User",
        path: "/dashboard/masterdata/user"
      },
      {
        label: "Kepercayaan",
        path: "/dashboard/masterdata/religion"
      },
      {
        label: "Suku",
        path: "/dashboard/masterdata/ethnic"
      },
      {
        label: "Status Pernikahan",
        path: "/dashboard/masterdata/marital-status"
      },
      {
        label: "Pekerjaan",
        path: "/dashboard/masterdata/job"
      },
      {
        label: "Pendidikan",
        path: "/dashboard/masterdata/education"
      },
      {
        label: "Instansi Relasi",
        path: "/dashboard/masterdata/relation-agency"
      },
      {
        label: "Asuransi",
        path: "/dashboard/masterdata/insurance-product"
      },
      {
        label: "Layanan",
        path: "/dashboard/masterdata/service"
      },
      {
        label: "Unit Layanan",
        path: "/dashboard/masterdata/unit"
      },
      {
        label: "Jadwal Dokter",
        path: "/dashboard/masterdata/doctor-schedule"
      },
    ]
  },
  {
    icon: <BiFirstAid size={20} />,
    label: "Pelayanan Umum",
    path: null,
    children: [
      {
        label: "Skrining",
        path: "/dashboard/public-service/screening"
      },
      {
        label: "Pemeriksaan Pasien",
        path: "/dashboard/public-service/inspection"
      }
    ]
  },
];