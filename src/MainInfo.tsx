import { ReactNode } from "react";
import style from "./MainInfo.module.scss";

function ProfilePic(props: {}) {
  return <div className={style.pfp}>Profile Picture Placeholder</div>;
}

export default function MainInfo(props: {}) {
  return (
    <div className={style.root}>
      <ProfilePic />
      <div className={style.info}>
        <div className={style.infotitle}>
          <h2>Dr Edith England</h2>
          <h4>Lecturer</h4>
          <h4>School of etc</h4>
        </div>
        <div className={style.contacts}>
          <div>email</div>
          <div>telephone</div>
          <div>etc</div>
        </div>
      </div>
    </div>
  );
}
