// [Work{
//institution	WorkInstitution{...}
//indexed*	Date{...}
//posted	DateParts{...}
//publisher-location	[...]
//update-to	[...]
//standards-body	[...]
//edition-number	[...]
//group-title	[...]
//reference-count*	[...]
//publisher*	[...]
//issue	[...]
//isbn-type	[...]
//license	[...]
//funder	[...]
//content-domain*	WorkDomain{...}
//chair	[...]
//short-container-title	[...]
//accepted	DateParts{...}
//content-updated	DateParts{...}
//published-print	DateParts{...}
//abstract	[...]
//DOI*	[...]
//type*	[...]
//created*	Date{...}
//approved	DateParts{...}
//page	[...]
//update-policy	[...]
//source*	[...]
//is-referenced-by-count*	[...]
//title*	[...]
//prefix*	[...]
//volume	[...]
//clinical-trial-number	[...]
//author*	[...]
//member*	[...]
//content-created	DateParts{...}
//published-online	DateParts{...}
//reference	Reference{...}
//container-title	[...]
//review	WorkReview{...}
//original-title	[...]
//language	[...]
//link	[...]
//deposited*	Date{...}
//score*	[...]
//degree	[...]
//subtitle	[...]
//translator	[...]
//free-to-read	WorkFreeToRead{...}
//editor	[...]
//component-number	[...]
//short-title	[...]
//issued*	DateParts{...}
//ISBN	[...]
//references-count*	[...]
//part-number	[...]
//journal-issue	WorkJournalIssue{...}
//alternative-id	[...]
//URL*	[...]
//archive	[...]
//relation	WorkRelation{...}
//ISSN	[...]
//issn-type	[...]
//subject	[...]
//published-other	DateParts{...}
//published	DateParts{...}
//assertion	[...]
//subtype	[...]
//article-number	[...]
//
export interface Institution {
  name: string;
  place: string[];
  department: string[];
  acroynm: string[];
}
export interface Date {
  timestamp: number;
  "date-time": string;
  "date-parts": number[][];
}
export interface Author {
  given?: string;
  family: string;
  name?: string;
  prefix: string;
  affiliation: string;
  suffix: string;
}
export interface WorkLink {
  URL: string;
  "content-type": string;
  "content-version": string;
  "intended-application": string;
}

export interface Work {
  institution?: Institution;
  DOI: string;
  type: string;
  created: Date;
  author: Author[];
  link?: WorkLink[];
  URL: string;
  published?: Date;
  title: string[];
  "short-title"?: string;
  "short-container-title"?: string;
  language: string;
  abstract?: string;
}

export type WorkType = "dataset" | "journal-article";

export async function getWorks(author: string): Promise<Work[] | null> {
  const safeAuthor = encodeURI(author);
  let url = `https://api.crossref.org/works?query.author=${safeAuthor}`;
  const resp = await fetch(url, {
    method: "GET",
  }).then((r) => r.json());
  if (resp?.status !== "ok") {
    return null;
  } else {
    return (resp.message.items as Work[]).filter((p) => p.title !== undefined);
  }
}
