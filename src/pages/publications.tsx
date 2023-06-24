import { Publication } from "../Types";
import style from "../tabs/Research.module.scss";
import ReactMarkdown from "react-markdown";
import path from "path";
import fs from "fs";
import yaml from "yaml";

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
          <ReactMarkdown>{pub.abstract}</ReactMarkdown>
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
