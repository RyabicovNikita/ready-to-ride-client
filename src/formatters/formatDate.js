import { DateTime } from "luxon";
import { mergeStringsBySpace } from "./formatString";

export function sortArrByCreateDate(array) {
  if (!Array.isArray(array)) return [];
  const fullDateFormat = "dd.MM.yyyy HH:mm:ss";
  return [...array].sort((a, b) => {
    // Преобразуем строки даты в объекты DateTime с помощью Luxon
    const dateA = DateTime.fromFormat(mergeStringsBySpace([a?.created_at?.date, a?.created_at?.time]), fullDateFormat);
    const dateB = DateTime.fromFormat(mergeStringsBySpace([b?.created_at?.date, b?.created_at?.time]), fullDateFormat);

    // Сортировка по убыванию (новые поездки впереди)
    return dateB - dateA;
  });
}
