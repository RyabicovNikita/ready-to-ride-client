import { DateTime } from "luxon";

export function sortArrByCreateDate(array) {
  const fullDateFormat = "dd.MM.yyyy HH:mm:ss";
  return [...array].sort((a, b) => {
    // Преобразуем строки даты в объекты DateTime с помощью Luxon
    const dateA = DateTime.fromFormat(a.created_at, fullDateFormat);
    const dateB = DateTime.fromFormat(b.created_at, fullDateFormat);

    // Сортировка по убыванию (новые поездки впереди)
    return dateB - dateA;
  });
}
