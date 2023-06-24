import fs from "fs";
import matter from "gray-matter";
import path from "path";

export interface MdMeta {
  meta: { [k: string]: string };
  content: string;
}

export function readWithFrontmatter(path: string): MdMeta {
  const content = fs.readFileSync(path, "utf-8");
  const parsed = matter(content);
  return { meta: parsed.data, content: parsed.content };
}

export function readAllWithFrontmatter(
  root: string,
  filter?: RegExp
): MdMeta[] {
  const files = fs
    .readdirSync(root)
    .filter((p) => filter?.test(p) ?? true)
    .map((p) => readWithFrontmatter(path.join(root, p)));
  return files;
}
