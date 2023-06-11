import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import MainInfo from "./MainInfo";
import style from "./App.module.scss";
import Tab from "./widgets/Tab";
import importAll from "./importAll";
import { TabInfo } from "./Types";
import LoadingSpinner from "./widgets/LoadingSpinner";

const TabFiles = importAll(require.context("./tabs", false, /\.tsx$/));

interface TabDataFetch<T> {
  fetching: boolean;
  data?: T;
}

function Tabs(props: { curr: TabInfo; setTab: (tab: TabInfo) => any }) {
  const TABS = TabFiles.map((t) => {
    return t.TAB;
  }).map((t) => (
    <Tab content={t.name} key={t.name} onClick={() => props.setTab(t)} />
  ));
  const [tabData, setTabData] = useState<{ [k: string]: TabDataFetch<any> }>(
    {}
  );

  const tdata = tabData[props.curr.name];
  const noData = tdata === undefined || tdata?.data === undefined;
  if (
    props.curr.fetchData !== undefined &&
    noData &&
    (tdata?.fetching ?? false) === false
  ) {
    setTabData((t) => ({ ...t, [props.curr.name]: { fetching: true } }));
    props.curr.fetchData().then((p) => {
      setTabData((t) => ({
        ...t,
        [props.curr.name]: { fetching: false, data: p },
      }));
    });
  }

  return (
    <div className={style.tabs}>
      <div className={style.tabSelects}>{TABS}</div>
      <hr />
      {(noData && props.curr.fetchData === undefined) ||
      (props.curr.fetchData !== undefined && !noData) ? (
        props.curr.render(tdata?.data)
      ) : (
        <LoadingSpinner message={props.curr.loadingMessage} />
      )}
    </div>
  );
}
const OVERVIEW_TAB = TabFiles[0].TAB;

function App() {
  const [currentTab, setCurrentTab] = useState(OVERVIEW_TAB);
  return (
    <div className={style.app}>
      <MainInfo />
      <Tabs curr={currentTab} setTab={setCurrentTab} />
    </div>
  );
}

export default App;
