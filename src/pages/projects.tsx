import { useState } from "react";
import MoreBtn from "../MoreBtn";
import { readAllWithFrontmatter } from "../util/md";
import path from "path";
import RenderMarkdown from "react-markdown";

interface ProjectInfo {
  meta: {
    title: string;
  };
  content: string;
}

function Project({ project }: { project: ProjectInfo }) {
  const [showContent, setShowContent] = useState(false);
  const content = <RenderMarkdown>{project.content}</RenderMarkdown>;
  return (
    <div>
      <div>
        <h3>
          {project.meta.title}
          <MoreBtn
            active={showContent}
            onClick={() => setShowContent((s) => !s)}
          />
        </h3>
      </div>
      <div>{showContent && <>{content}</>}</div>
      <noscript>{content}</noscript>
    </div>
  );
}
export async function getStaticProps() {
  const projects = readAllWithFrontmatter(
    path.join(process.cwd(), "src/content/projects"),
    /\.md$/
  );
  return {
    props: {
      projects: projects,
    },
  };
}

export default function Projects(props: { projects: ProjectInfo[] }) {
  const projectEls = props.projects.map((p) => (
    <Project project={p} key={p.meta.title} />
  ));
  return <div>{projectEls}</div>;
}
