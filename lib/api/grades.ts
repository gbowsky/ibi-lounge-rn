import { makeApiRequestUrl } from "./url";

export interface GradeItem {
  name: string;
  type:
    | "subject_report"
    | "subject_report_with_grade"
    | "course_work"
    | "offline_course_work"
    | "exam"
    | "unknown";
  grade:
    | "5"
    | "4"
    | "3"
    | "2"
    | "passed"
    | "absence"
    | "failed"
    | "not_admitted"
    | "unknown";
}

interface GradesGetParams {
  pin: string;
  last_name: string;
}

export async function getGrades(
  pin: string,
  lastName: string,
): Promise<GradeItem[] | false> {
  const params: GradesGetParams = {
    pin: pin,
    last_name: lastName,
  };

  const url = makeApiRequestUrl(
    "grades",
    params as unknown as Record<string, string>,
  );
  try {
    const req = await fetch(url);

    if (!req.ok) {
      console.warn("Something not right in getGrades response:", url);
      console.log(await req.json());
      return false;
    }

    const json = await req.json();
    return json as GradeItem[];
  } catch (e) {
    console.error("getGrades: req error:", e);
    return false;
  }
}
