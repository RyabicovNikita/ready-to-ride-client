import { DateTime } from "luxon";

export const mapDateToFormat = (UTCdate, format = "dd.LL.yyyy HH:mm:ss") => {
  return DateTime.fromISO(UTCdate.toISOString()).toFormat(format);
};
