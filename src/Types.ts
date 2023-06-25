export interface TabInfo<Data = undefined> {
  render: (data: Data) => JSX.Element;
  name: string;
  fetchData?: () => Promise<Data>;
  loadingMessage?: string;
}

export type Markdown = string;

export interface Author {
  first: string;
  family: string;
}

export interface PubDate {
  year: number;
  month: number;
  day: number;
}
export type PubType = "thesis" | "paper";
export const DEFAULT_PUB_TYPE: PubType = "paper";

interface PubBase {
  title: string;
  about?: Markdown;
  published: PubDate;
  url?: string;
}
export type ThesisPub = {
  type: "thesis";
  author: Author;
  level: string;
  unpublished: boolean;
  city: string;
  university: string;
} & PubBase;

export type PaperPub = {
  type: "paper" | undefined;
  doi?: string;
  journal: string;
  authors: Author[];
  "page-range"?: { from: number; to: number };
  volume?: number;
  issue?: number;
} & PubBase;

export type Publication = ThesisPub | PaperPub;
