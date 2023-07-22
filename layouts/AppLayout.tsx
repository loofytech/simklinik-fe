import {useState} from "react";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {Layout, Menu, Button, theme} from "antd";
import {items} from "@/routes";
import { useRouter } from "next/router";

const { Header, Sider, Content } = Layout;

interface LProps {
  children: React.ReactNode;
}

export default function AppLayout({children}: LProps) {
  const [collapsed, setCollapsed] = useState(false);
  const {token: {colorBgContainer }} = theme.useToken();
  const rts = useRouter();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="text-white py-5 px-3">Loofytech klinik</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[rts.pathname]}
          defaultOpenKeys={[rts.pathname.split("/")[2]]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
