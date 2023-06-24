import { Publication, Author } from "../Types";
import style from "../tabs/Research.module.scss";
import ReactMarkdown from "react-markdown";
import path from "path";
import fs from "fs";
import yaml from "yaml";
import { useState } from "react";
import { readAllWithFrontmatter } from "../util/md";

const PUBLICATATIONS_ROOT = path.join(process.cwd(), "src/publications");

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
    let firstSet = authors.slice(0, -2).map(formatAuthor).join(", ");
    return firstSet + " and " + formatAuthor(authors[authors.length - 1]);
  }
}

function Paper(props: { pub: Publication }) {
  const [showAbstract, setShowAbstract] = useState(false);
  const pub = props.pub;
  let authors = formatAuthors(pub.authors);
  return (
    <div className={style.paper}>
      <div className={style.ref}>
        <p>
          {authors}. {pub.published.year}. <a href={pub.url}>'{pub.title}'</a>.{" "}
          {pub.journal}{" "}
          {pub.doi && (
            <>
              (<a href={makePaperUrl(pub.doi)}>{pub.doi}</a>)
            </>
          )}
          {pub.about && (
            <button
              className={style.moreBtn}
              onClick={() => setShowAbstract((s) => !s)}
            >
              <i>«{showAbstract ? "less" : "more"}»</i>
            </button>
          )}
        </p>
      </div>
      {showAbstract && pub.about && (
        <div className={style.abstract}>
          <h3>About</h3>
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
  const paperEls = props.papers.map((p) => <Paper key={p.title} pub={p} />);
  return <div className={style.papers}>{paperEls}</div>;
}
