import { useEffect, useState } from "react";
import { TabInfo } from "../Types";
import { Author, Work, getWorks } from "../papers-api";
import style from "./Research.module.scss";
import { expandEscapeCodes } from "../htmlUtil";
import LoadingSpinner from "../widgets/LoadingSpinner";

function RenderAuthor(props: { author: Author; last: boolean }) {
  return (
    <div>
      <h4>
        <i>
          {props.author.given} {props.author.family}
        </i>
        {!props.last && ","}
      </h4>
    </div>
  );
}

function Paper(props: { pub: Work }) {
  const pub = props.pub;
  const pubTitle = pub.title[0];
  return (
    <div className={style.paper}>
      <div>
        <h2>{expandEscapeCodes(pubTitle)}</h2>
        <h3>
          <a href={pub.URL}>Journal</a>
        </h3>
      </div>
      {pub.abstract && (
        <div className={style.abstract}>
          <h3>Abstract</h3>
          {pub.abstract}
        </div>
      )}
      <div className={style.authors}>
        {pub.author.map((a, i) => (
          <div key={i}>
            <RenderAuthor author={a} last={i === pub.author.length - 1} />
          </div>
        ))}
      </div>
    </div>
  );
}

function RenderPapers(props: { papers: Work[] }) {
  const paperEls = props.papers.map((p) => <Paper key={p.DOI} pub={p} />);
  return <div className={style.papers}>{paperEls}</div>;
}

export const TAB: TabInfo<Work[]> = {
  render: (papers) => {
    return <RenderPapers papers={papers} />;
  },
  name: "Research",
  fetchData: async () => {
    const works = await getWorks("Edith England");
    var seen: any = {};
    return works
      .filter((p) => {
        if (seen[p.DOI] === undefined) {
          seen[p.DOI] = true;
          return true;
        } else {
          return false;
        }
      })
      .filter((p) => p.type === "journal-article")
      .filter((p) =>
        p.author.some(
          (a) =>
            a.given?.toLowerCase() === "edith" &&
            a.family.toLowerCase() === "england"
        )
      );
  },
  loadingMessage: "Fetching papers, please wait",
};
