import { Publication, Author, PaperPub, ThesisPub } from "../Types";
import style from "../tabs/Research.module.scss";
import ReactMarkdown from "react-markdown";
import path from "path";
import fs from "fs";
import yaml from "yaml";
import { useState } from "react";
import { readAllWithFrontmatter } from "../util/md";
import MoreBtn from "../MoreBtn";

const PUBLICATATIONS_ROOT = path.join(
  process.cwd(),
  "src/content/publications"
);

function makePaperUrl(doi: string) {
  return `https://dx.doi.org/${doi}`;
}

function formatAuthor(author: Author) {
  return `${author.family}, ${author.first.at(0)?.toUpperCase()}`;
}
function formatAuthors(authors: Author[]) {
  if (authors.length >= 4) {
    return `${formatAuthor(authors[0])}. et al`;
  } else if (authors.length === 1) {
    return formatAuthor(authors[0]);
  } else {
    let firstSet = authors.slice(0, -1).map(formatAuthor).join(", ");
    return firstSet + " and " + formatAuthor(authors[authors.length - 1]);
  }
}
function PageRange(props: { range: { from: number; to: number } }) {
  return (
    <>
      {" "}
      pp. {props.range.from}-{props.range.to}
    </>
  );
}

function Thesis({ pub }: { pub: ThesisPub }) {
  const author = formatAuthor(pub.author);
  return (
    <>
      {author}., {pub.published.year} <i>'{pub.title}'</i>{" "}
      <i>
        {pub.unpublished && ", Unpublished"} {pub.level} thesis
      </i>
      , {pub.university}, {pub.city}{" "}
    </>
  );
}
function RenderPublication({ pub }: { pub: Publication }) {
  const [showAbstract, setShowAbstract] = useState(false);

  return (
    <div className={style.paper}>
      <div className={style.ref}>
        <p>
          {pub.type === "thesis" ? <Thesis pub={pub} /> : <Paper pub={pub} />}

          {pub.about && (
            <MoreBtn
              onClick={() => setShowAbstract((s) => !s)}
              active={showAbstract}
            />
          )}
        </p>
      </div>
      {showAbstract && pub.about && (
        <div className={style.abstract}>
          <ReactMarkdown>{pub.about}</ReactMarkdown>
        </div>
      )}
      {pub.about && (
        <noscript>
          <ReactMarkdown>{pub.about}</ReactMarkdown>
        </noscript>
      )}
    </div>
  );
}

function Paper({ pub }: { pub: PaperPub }) {
  const authors = formatAuthors(pub.authors);
  return (
    <>
      {authors}., {pub.published.year}. <a href={pub.url}>'{pub.title}'</a>.{" "}
      <i>{pub.journal}</i>,
      {pub.volume && pub.issue && ` ${pub.volume}(${pub.issue}), `}
      {pub["page-range"] && <PageRange range={pub["page-range"]} />}{" "}
      {pub.doi && (
        <>
          (<a href={makePaperUrl(pub.doi)}>{pub.doi}</a>)
        </>
      )}
    </>
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
  const mdPapers = readAllWithFrontmatter(PUBLICATATIONS_ROOT, /\.md$/).map(
    (p) => ({ ...p.meta, about: p.content } as Publication)
  );
  return { props: { papers: [...papers, ...mdPapers] } };
}

export default function Publications(props: { papers: Publication[] }) {
  const paperEls = props.papers
    .sort((a, b) => b.published.year - a.published.year)
    .map((p) => (
      <li key={p.title}>
        <RenderPublication pub={p} />
      </li>
    ));
  return (
    <div className={style.papers}>
      <ul>{paperEls}</ul>
    </div>
  );
}
