import { useEffect, useState } from "react";
import { TabInfo } from "../Types";
import { Author, Work, getWorks } from "../papers-api";
import style from "./Research.module.scss";
import { expandEscapeCodes } from "../htmlUtil";

function RenderAuthor(props: { author: Author; last: boolean }) {
  return (
    <div>
      <h4>
        {props.author.given} {props.author.family}
        {!props.last && ","}
      </h4>
    </div>
  );
}

function Paper(props: { pub: Work }) {
  const pub = props.pub;
  const pubTitle = pub.title[0];
  return (
    <div>
      <div className={style.authors}>
        {pub.author.map((a, i) => (
          <div>
            <RenderAuthor
              key={i}
              author={a}
              last={i === pub.author.length - 1}
            />
          </div>
        ))}
      </div>
      <a href={pub.URL}>
        {" "}
        <h2>{expandEscapeCodes(pubTitle)}</h2>
      </a>
      <div>{pub.abstract}</div>
    </div>
  );
}

function RenderPapers(props: {}) {
  const [papers, setPapers] = useState<Work[]>();
  useEffect(() => {
    getWorks("Edith England").then((p) => {
      if (p !== null) {
        var seen: any = {};
        setPapers(
          p.filter((p) => {
            if (seen[p.DOI] === undefined) {
              seen[p.DOI] = true;
              return true;
            } else {
              return false;
            }
          })
        );
      }
    });
  }, []);
  const paperEls = papers?.map((p) => <Paper key={p.DOI} pub={p} />);
  return <div>{paperEls}</div>;
}

export const TAB: TabInfo = {
  render: () => {
    return (
      <div>
        Research goes here <RenderPapers />
      </div>
    );
  },
  name: "Research",
};
