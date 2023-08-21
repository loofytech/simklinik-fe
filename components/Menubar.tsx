import Link from "next/link";
import { items } from "@/routes";
import { useRouter } from "next/router";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

export default function Menubar() {
  const router = useRouter();

  return (<>
    <Sidebar>
      <Menu className="text-sm bg-primary text-white overflow-auto h-screen">
        <div className="p-5 text-lg">Logo App</div>
        {items.map((iMenu: any, iKey: number) => {
          if (!iMenu.children) {
            return (<MenuItem
              key={iKey}
              icon={iMenu.icon}
              component={<Link href={iMenu.path} />}
              className="pr-2 hover:text-slate-950"
              active={true}
            >
              {iMenu.label}
            </MenuItem>);
          }
          return (<SubMenu
            key={iKey}
            label={iMenu.label}
            icon={iMenu.icon}
            className="pr-2 hover:text-slate-950"
          >
            {iMenu.children.map((iMenuN: any, iKeyN: number) => {
              return (<MenuItem key={iKeyN} component={<Link href={iMenuN.path} />}>
                {iMenuN.label}
              </MenuItem>);
            })}
          </SubMenu>);
        })}
      </Menu>
    </Sidebar>
  </>);
}