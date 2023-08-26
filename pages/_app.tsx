import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/store";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }: AppProps) {
  return (<Provider store={store}>
    <NextNProgress color="#696cff" />
    <Component {...pageProps} />
  </Provider>);
}
