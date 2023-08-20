import Menubar from "@/components/Menubar";
import Topbar from "@/components/Topbar";
import useScript from "@/utils/useScript";
import Head from "next/head";
import Script from "next/script";

interface LProps {
  children: React.ReactNode;
}

export default function AppLayout({children}: LProps) {
  useScript([
    "/static/scripts/jquery.js",
    "/static/scripts/popper.js",
    "/static/scripts/bootstrap.js",
    "/static/scripts/perfect-scrollbar.js",
    "/static/scripts/apexcharts.js",
    "/static/scripts/main.js"
  ]);

  return (<>
    <Head>
      <script src="/static/scripts/helpers.js"></script>
      <script src="/static/scripts/menu.js"></script>
    </Head>
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <Menubar />
        <div className="layout-page">
          <Topbar />
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              {children}              
            </div>
            <div className="content-backdrop fade"></div>
          </div>
        </div>
      </div>
      <div className="layout-overlay layout-menu-toggle"></div>
    </div>
  </>);
}
