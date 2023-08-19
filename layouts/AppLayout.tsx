import Menubar from "@/components/Menubar";
import Topbar from "@/components/Topbar";
import useScript from "@/utils/useScript";
import Script from "next/script";

interface LProps {
  children: React.ReactNode;
}

export default function AppLayout({children}: LProps) {
  useScript([
    "/static/scripts/helpers.js",
    "/static/scripts/jquery.js",
    "/static/scripts/popper.js",
    "/static/scripts/bootstrap.js",
    "/static/scripts/perfect-scrollbar.js",
    "/static/scripts/menu.js",
    "/static/scripts/apexcharts.js",
    "/static/scripts/main.js"
  ]);

  return (
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
  );
}
