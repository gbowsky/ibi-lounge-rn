import { enUS, ru } from "date-fns/locale";
import { i18n } from "./localization";
import { format } from "date-fns";

export function formatDate(date: Date, formatStr: string) {
  const locale = i18n.locale === "en" ? enUS : ru;

  return format(date, formatStr, {
    locale: locale,
  });
}
