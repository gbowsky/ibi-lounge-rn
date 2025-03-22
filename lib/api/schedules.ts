import { format } from "date-fns";
import { makeApiRequestUrl } from "./url";

export interface DayItem {
  day: string;
  month: string;
  week_day: string;
  lessons: LessonItem[];
}

export interface LessonItem {
  time_start: string;
  time_end: string;
  text: string;
  additional: Additional;
}

interface Additional {
  is_online: boolean;
  type:
    | "lecture"
    | "practice"
    | "consultation"
    | "subject_report_with_grade"
    | "exam"
    | "subject_report"
    | "course_work_defend"
    | "library_day"
    | "project_work"
    | "meeting"
    | "unknown";
  url?: string;
  classroom?: string;
  teacher_name?: string;
  compensation?: string;
  teacher_groups?: string[];
  classroom_details?: ClassRoomDetails;
}

interface ClassRoomDetails {
  address?: string;
  classroom_number?: string;
  computer_classroom: boolean;
  online_classroom: boolean;
}

interface SchedulesGetParams {
  dateStart: string;
  dateEnd: string;
  group?: string;
  teacher?: string;
}

function formatDate(date: Date) {
  return format(date, "dd.MM.yyyy");
}

export async function getSchedules(
  from: Date,
  to: Date,
  { groupId, teacherId }: { groupId?: string; teacherId?: string },
): Promise<DayItem[] | false> {
  const params: SchedulesGetParams = {
    dateStart: formatDate(from),
    dateEnd: formatDate(to),
  };

  if (groupId === undefined && teacherId === undefined) {
    console.warn("No groupId or teacherId provided to getSchedule's params!");
    return false;
  }

  if (groupId) {
    params.group = groupId;
  }

  if (teacherId) {
    params.teacher = teacherId;
  }

  const url = makeApiRequestUrl(
    "schedules",
    params as unknown as Record<string, string>,
  );
  try {
    const req = await fetch(url);

    if (!req.ok) {
      console.warn("Something not right in getSchedules response:", url);
      console.log(await req.json());
      return false;
    }

    const json = await req.json();
    return json as DayItem[];
  } catch (e) {
    console.error("getSchedules: req error:", e);
    return false;
  }
}
