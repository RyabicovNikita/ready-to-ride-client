import { DateTime } from "luxon";

export function convertToDatetimeLocal(date, time) {
  const dateTimeString = `${date} ${time}`;

  const dt = DateTime.fromFormat(dateTimeString, "dd.MM.yyyy HH:mm");

  return dt.toFormat("yyyy-MM-dd'T'HH:mm");
}
