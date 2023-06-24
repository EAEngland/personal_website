import { Publication } from "../Types";
import style from "../tabs/Research.module.scss";
import ReactMarkdown from "react-markdown";
import path from "path";
import fs from "fs";
import yaml from "yaml";
import { useState } from "react";

const PUBLICATATIONS_ROOT = path.join(process.cwd(), "src/publications");

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
  const [showAbstract, setShowAbstract] = useState(false);
  const pub = props.pub;
  let authors = `${pub.authors[0].family}, ${pub.authors[0].first
    .at(0)
    ?.toUpperCase()}`;
  if (pub.authors.length > 1) {
    authors += " et al";
  }
  return (
    <div className={style.paper}>
      <div>
        {authors}. {pub.published.year}. '{pub.title}'. {pub.journal} (
        <a href={makePaperUrl(pub.doi)}>{pub.doi}</a>)
        <div>
          {pub.about && (
            <button onClick={() => setShowAbstract((s) => !s)}>More</button>
          )}
        </div>
      </div>
      {showAbstract && pub.about && (
        <div className={style.abstract}>
          <h3>About</h3>
          <ReactMarkdown>{pub.about}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export async function getStaticProps() {
  const extenRegex = /\.ya?ml$/;
  const papers = fs
    .readdirSync(PUBLICATATIONS_ROOT)
    .filter((f) => extenRegex.test(f))
    .map((p) => {
      const content = fs.readFileSync(
        path.join(PUBLICATATIONS_ROOT, p),
        "utf-8"
      );
      const pub = yaml.parse(content) as Publication;
      return pub;
    });
  return { props: { papers: papers } };
}

export default function Publications(props: { papers: Publication[] }) {
  const paperEls = props.papers.map((p) => <Paper key={p.doi} pub={p} />);
  return <div className={style.papers}>{paperEls}</div>;
}
