import {
  RadarChartOutlined,
  ScheduleOutlined
} from "@ant-design/icons";
import type { MenuProps } from 'antd';
import Link from "next/link";

type MenuItem = Required<MenuProps>['items'][number];

interface GProps {
  label: React.ReactNode;
  key: React.Key;
  icon?: React.ReactNode;
  children?: MenuItem[];
  type?: "group";
}

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[], type?: 'group'): MenuItem {
  return {key, icon, children, label, type} as MenuItem;
}

const route = (path: string, label: string) => {
  return <Link href={path}>{label}</Link>;
}

export const items: MenuItem[] = [
  getItem(route("/dashboard", "Dashboard"), "/dashboard", <RadarChartOutlined />),
  getItem(route("/dashboard/registration", "Registration"), "/dashboard/registration", <ScheduleOutlined />),

  getItem('Masterdata', 'masterdata', <ScheduleOutlined />, [
    getItem(route("/dashboard/masterdata/unit", "Units"), "/dashboard/masterdata/unit"),
    getItem(route("/dashboard/masterdata/profession", "Profession"), "/dashboard/masterdata/profession"),
    getItem(route("/dashboard/masterdata/user", "Users"), "/dashboard/masterdata/user"),
    getItem(route("/dashboard/masterdata/patient", "Patients"), "/dashboard/masterdata/patient"),
    getItem(route("/dashboard/masterdata/doctor-schedule", "Doctor's Schedule"), "/dashboard/masterdata/doctor-schedule"),
    getItem(route("/dashboard/masterdata/diagnosis", "Diagnosa"), "/dashboard/masterdata/diagnosis"),
    getItem(route("/dashboard/masterdata/fare-version", "Fare Version"), "/dashboard/masterdata/fare-version"),
    getItem(route("/dashboard/masterdata/education", "Educations"), "/dashboard/masterdata/education"),
    getItem(route("/dashboard/masterdata/job", "Jobs"), "/dashboard/masterdata/job"),
    getItem(route("/dashboard/masterdata/religion", "Religions"), "/dashboard/masterdata/religion"),
    getItem(route("/dashboard/masterdata/supplier", "Suppliers"), "/dashboard/masterdata/supplier"),
    getItem(route("/dashboard/masterdata/clinic-rate", "Clinic Rates"), "/dashboard/masterdata/clinic-rate"),
    getItem(route("/dashboard/masterdata/master-lab-test", "Master Lab Test"), "/dashboard/masterdata/master-lab-test"),
    getItem(route("/dashboard/masterdata/relation-agency", "Relation Agency"), "/dashboard/masterdata/relation-agency"),
    getItem(route("/dashboard/masterdata/insurance-product", "Insurance Product"), "/dashboard/masterdata/insurance-product"),
  ]),

  // getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
  //   getItem('Option 9', '9'),
  //   getItem('Option 10', '10'),

  //   getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
  // ]),
];