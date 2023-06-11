import { ReactNode } from "react";

export interface TabInfo<Data = undefined> {
  render: (data: Data) => JSX.Element;
  name: string;
  fetchData?: () => Promise<Data>;
  loadingMessage?: string;
}
