import style from "./Tab.module.scss";

export default function Tab(props: {
  content: string;
  onClick?: () => any;
  active: boolean;
}) {
  return (
    <div
      className={`${style.root} ${props.active ? style.active : ""}`}
      onClick={props.onClick}
    >
      {props.content}
    </div>
  );
}
