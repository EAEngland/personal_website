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

export interface Publication {
  title: string;
  about?: Markdown;
  published: PubDate;
  doi?: string;
  url?: string;
  journal: string;
  authors: Author[];
  "page-range"?: { from: number; to: number };
  volume?: number;
  issue?: number;
}
