import { useEffect, useState } from "react";
import { Publication, TabInfo } from "../Types";
import { Author, Work, getWorks } from "../papers-api";
import style from "./Research.module.scss";
import { expandEscapeCodes } from "../htmlUtil";
import LoadingSpinner from "../widgets/LoadingSpinner";
import importAll from "../importAll";

function RenderAuthor(props: { author: string; last: boolean }) {
  return (
    <div>
      <h4>
        <i>{props.author}</i>
        {!props.last && ","}
      </h4>
    </div>
  );
}

function makePaperUrl(doi: string) {
  return `https://dx.doi.org/${doi}`;
}

function Paper(props: { pub: Publication }) {
  const pub = props.pub;
  return (
    <div className={style.paper}>
      <div>
        <h2>{pub.title}</h2>
        <h3>
          <a href={makePaperUrl(pub.doi)}>Journal</a>
        </h3>
      </div>
      {pub.abstract && (
        <div className={style.abstract}>
          <h3>Abstract</h3>
          {pub.abstract}
        </div>
      )}
      <div className={style.authors}>
        {pub.authors.map((a, i) => (
          <div key={i}>
            <RenderAuthor author={a} last={i === pub.authors.length - 1} />
          </div>
        ))}
      </div>
    </div>
  );
}

function RenderPapers(props: { papers: Publication[] }) {
  const paperEls = props.papers.map((p) => <Paper key={p.doi} pub={p} />);
  return <div className={style.papers}>{paperEls}</div>;
}

const PAPERS = importAll(
  require.context("../publications", false, /\.(yaml|yml)$/)
).map((p) => p as Publication);

export const TAB: TabInfo<Work[]> = {
  render: () => {
    console.log("papers: ", PAPERS);
    return <RenderPapers papers={PAPERS} />;
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
