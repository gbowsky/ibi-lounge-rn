export const BASE_URL = "https://lounge.utme.space/";

type GetPaths =
  | "schedules"
  | "groups"
  | "teachers"
  | "grades"
  | "levels"
  | "links";

export function makeApiRequestUrl(
  path: GetPaths,
  params?: Record<string, string>,
): string {
  if (!params) {
    return BASE_URL + path;
  }

  const searchParams = new URLSearchParams(params);
  return BASE_URL + path + "?" + searchParams.toString();
}
