import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import MainInfo from "./MainInfo";
import style from "./App.module.scss";
import Tab from "./widgets/Tab";
import importAll from "./importAll";
import { TabInfo } from "./Types";

const TabFiles = importAll(require.context("./tabs", false, /\.tsx$/));

function CurrTab(props: { tab: TabInfo }) {
  return <>{props.tab.render()}</>;
}
function Tabs(props: { curr: TabInfo; setTab: (tab: TabInfo) => any }) {
  const TABS = TabFiles.map((t) => {
    return t.TAB;
  }).map((t) => (
    <Tab content={t.name} key={t.name} onClick={() => props.setTab(t)} />
  ));
  return (
    <div className={style.tabs}>
      <div className={style.tabSelects}>{TABS}</div>
      <hr />
      <CurrTab tab={props.curr} />
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
