import { ReactNode } from "react";

export interface TabInfo {
  render: () => JSX.Element;
  name: string;
}
