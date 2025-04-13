import { DateTime } from "luxon";
import * as yup from "yup";

const today = DateTime.now();
const eighteenYearsAgo = today.minus({ years: 18 }); // Дата 18 лет назад
const oneHundredYearsAgo = today.minus({ years: 100 }); // Дата 100 лет назад

export const userShapeObject = {
  firstName: yup
    .string()
    .required("Введите имя")
    .min(3, "Имя может содержать не менее 3 символов")
    .max(100, "Имя не может быть длиннее 100 символов ")
    .matches(/^[A-Za-zА-Яа-яЁё]+$/, "Имя может содержать только буквы"),
  lastName: yup
    .string()
    .min(3, "Фамилия может содержать не менее 3 символов")
    .max(100, "Фамилия не может быть длиннее 100 символов ")
    .matches(/^[A-Za-zА-Яа-яЁё]+$/, "Фамилия может содержать только буквы"),
  birthday: yup
    .date()
    .nullable()
    .notRequired()
    .test("age-check", "Возраст должен быть не меньше 18 лет", (value) => {
      if (value) {
        return value <= eighteenYearsAgo;
      }
      return true; 
    })
    .test("age-check-max", "Возраст должен быть не больше 100 лет", (value) => {
      if (value) {
        return value >= oneHundredYearsAgo;
      }
      return true;
    }),
};
