import style from "./Tab.module.scss";

export default function Tab(props: { content: string; onClick?: () => any }) {
  return (
    <div className={style.root} onClick={props.onClick}>
      {props.content}
    </div>
  );
}
