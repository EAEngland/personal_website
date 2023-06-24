import Link from "next/link";
import style from "./Tab.module.scss";

export default function Tab(props: {
  content: string;
  active: boolean;
  url: string;
}) {
  return (
    <div className={`${style.root} ${props.active ? style.active : ""}`}>
      <Link href={props.url}>{props.content}</Link>
    </div>
  );
}
