import { ReactNode, ReactPropTypes } from "react";
import style from "./MainInfo.module.scss";
import twitterIco from "./assets/icons/twitter.svg";
import linkedinIco from "./assets/icons/linkedin.svg";
import orcidIco from "./assets/icons/orcid.svg";
import rsGateIco from "./assets/icons/researchGate.svg";
import gsScholarIco from "./assets/icons/googleScholar.svg";
import Image, { StaticImageData } from "next/image";

function ProfilePic(props: {}) {
  return <div className={style.pfp}>Profile Picture Placeholder</div>;
}
function Icon(props: any) {
  return (
    <div className={style.icon}>
      <Image {...props} fill />
    </div>
  );
}
interface ExternalContact {
  icon: StaticImageData | string;
  href: string;
  text: string;
  alt: string;
}
const EXTERNAL_CONTACTS: ExternalContact[] = [
  {
    icon: twitterIco,
    alt: "Twitter",
    href: "https://twitter.com/EdithAEngland",
    text: "@EdithAEngland",
  },
  {
    icon: linkedinIco,
    alt: "LinkedIn",
    href: "https://www.linkedin.com/in/edithaengland/",
    text: "edithaengland",
  },
  {
    icon: rsGateIco,
    alt: "",
    href: "https://www.researchgate.net/profile/Edith-England-2",
    text: "Research Gate",
  },
  {
    icon: orcidIco,
    alt: "",
    href: "https://orcid.org/0000-0001-9894-8323",
    text: "ORCID",
  },
  {
    icon: gsScholarIco,
    alt: "Google Scholar",
    href: "https://scholar.google.com/citations?user=6Y0WXtwAAAAJ",
    text: "Edith England",
  },
];

export function ExternalContacts(props: { bottom?: boolean }) {
  const bottom = props.bottom ?? false;
  const contactEls = EXTERNAL_CONTACTS.map((c) => (
    <div className={style.externalContact} key={c.alt}>
      <Icon src={c.icon} alt={c.alt} />
      <a href={c.href}>{c.text}</a>
    </div>
  ));
  return (
    <div
      className={`${style.externalContacts} ${
        bottom ? style.botContacts : style.topContacts
      }`}
    >
      <h4 className={style.contactHeader}>Profiles</h4>
      <hr />
      <div>
        <div>{contactEls}</div>
      </div>
    </div>
  );
}
function ContactDetails() {
  return (
    <div className={style.contacts}>
      <div>email</div>
      <div>telephone</div>
      <div>etc</div>
    </div>
  );
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
        <ContactDetails />
      </div>
      <div className={style.flexFiller} />
      <ExternalContacts />
    </div>
  );
}
