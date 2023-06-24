import "../index.scss";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import React from "react";
import style from "../App.module.scss";
import MainInfo from "../MainInfo";
import { TabInfo } from "../Types";
import Tab from "../widgets/Tab";
import { useRouter } from "next/router";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
const TABS: { name: string; url: string }[] = [
  { name: "Overview", url: "/" },
  { name: "Publications", url: "/publications" },
];

function Tabs(props: { children?: ReactNode }) {
  const router = useRouter();
  const tabEls = TABS.map((t) => (
    <Tab
      content={t.name}
      active={
        router.asPath === "/"
          ? router.asPath === t.url
          : router.asPath.startsWith(t.url)
      }
      key={t.name}
      url={t.url}
    />
  ));

  return (
    <div className={style.tabs}>
      <div className={style.tabSelects}>{tabEls}</div>
      <hr />
      {props.children}
    </div>
  );
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <div className={style.app}>
      <MainInfo />
      <Tabs>
        <Component {...pageProps} />
      </Tabs>
    </div>
  );
}
