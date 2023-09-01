import Menubar from "@/components/Menubar";
import Topbar from "@/components/Topbar";
import useScript from "@/utils/useScript";
import Script from "next/script";
import { Roboto } from "next/font/google";

const font = Roboto({weight: "400", subsets: ["latin"]});

interface LProps {
  children: React.ReactNode;
  active?: string;
}

export default function AppLayout({children, active}: LProps) {
  return (<div className={`${font.className} flex`}>
    <Menubar active={active} />
    <div className="w-full bg-soft min-h-screen">
      <Topbar />
      <div className="p-5">{children}</div>
    </div>
  </div>);
}
