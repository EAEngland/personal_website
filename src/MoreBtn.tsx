import style from "./MoreBtn.module.scss";

export default function MoreBtn(props: {
  onClick?: () => any;
  active: boolean;
}) {
  return (
    <button className={style.moreBtn} onClick={props.onClick}>
      <i>«{props.active ? "less" : "more"}»</i>
    </button>
  );
}
