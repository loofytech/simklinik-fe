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
  ]),

  // getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
  //   getItem('Option 9', '9'),
  //   getItem('Option 10', '10'),

  //   getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
  // ]),
];