import style from "./LoadingSpinner.module.scss";

export default function LoadingSpinner(props: { message?: string }) {
  return (
    <div className={style.root}>
      <div className={style.spinner} />
      {props.message}
    </div>
  );
}
