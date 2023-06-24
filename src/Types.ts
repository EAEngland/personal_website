import { ReactNode } from "react";

export interface TabInfo<Data = undefined> {
  render: (data: Data) => JSX.Element;
  name: string;
  fetchData?: () => Promise<Data>;
  loadingMessage?: string;
}

export type Markdown = string;

export interface PubDate {
  year: number;
  month: number;
  day: number;
}

export interface Publication {
  title: string;
  abstract: Markdown;
  about?: Markdown;
  published: PubDate;
  doi: string;
  journal: string;
  authors: { first: string; family: string }[];
}
