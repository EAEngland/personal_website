import fs from "fs";
import path from "path";
import RenderMarkdown from "react-markdown";

export async function getStaticProps() {
  const content = fs.readFileSync(
    path.join(process.cwd(), "src/content/bio.md"),
    "utf-8"
  );
  return { props: { content: content } };
}

export default function Bio(props: { content: string }) {
  return <RenderMarkdown>{props.content}</RenderMarkdown>;
}
