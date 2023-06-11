import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Overview from "./tabs/Overview";
import Bio from "./tabs/Bio";
import MainInfo from "./MainInfo";
import style from "./App.module.scss";
import Tab from "./widgets/Tab";

enum CurrentTab {
  Overview,
  Bio,
}

function CurrTab(props: { tab: CurrentTab }) {
  switch (props.tab) {
    case CurrentTab.Overview:
      return <Overview />;
    case CurrentTab.Bio:
      return <Bio />;
  }
}
function Tabs(props: { curr: CurrentTab; setTab: (tab: CurrentTab) => any }) {
  const tabs = [
    ["Overview", CurrentTab.Overview],
    ["Biography", CurrentTab.Bio],
  ];
  const tabSelects = tabs.map(([name, t]) => (
    <Tab
      key={name}
      onClick={() => props.setTab(t as CurrentTab)}
      content={name as string}
    />
  ));
  return (
    <div className={style.tabs}>
      <div className={style.tabSelects}>{tabSelects}</div>
      <hr />
      <CurrTab tab={props.curr} />
    </div>
  );
}

function App() {
  const [currentTab, setCurrentTab] = useState(CurrentTab.Overview);
  return (
    <div className={style.app}>
      <MainInfo />
      <Tabs curr={currentTab} setTab={setCurrentTab} />
    </div>
  );
}

export default App;
