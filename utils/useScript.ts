import { useRouter } from "next/router";
import { useEffect } from "react";

export default function useScript(scripts: string[]) {
  const router = useRouter();
  let scriptRefArr: any = [];

  useEffect(() => {
    if (router) for (let item of scripts) {
      loadScript(item);
    }
    return () => {
      if (scriptRefArr.length > 0) {
        removeScript();
      }
    }
  }, [router]);

  const loadScript = (src: any) => {
    const script = document.createElement("script");
    script.src = src;
    // script.type = "module";
    if (!scriptRefArr.find((item: any) => item.url === src)) {
      document.body.appendChild(script);
      scriptRefArr.push({url: src, script});
    }
    // console.log(src);
  }

  const removeScript = () => {
    scriptRefArr.forEach((item: any) => {
      if (document.body.contains(item.script)) {
        document.body.removeChild(item.script);
      }
    });
    // console.log(scriptRefArr);
  }
}