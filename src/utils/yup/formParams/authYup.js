import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const registerShapeObject = {
  email: yup
    .string()
    .required("Введите email")
    .matches(/\w+$/, "Некорректный email.")
    .min(3, "Email должен быть не менее 3 символов")
    .max(64, "Email слишком длинный. Пожалуйста, введите email, не превышающий 64 символов"),
  firstName: yup
    .string()
    .required("Введите имя")
    .min(3, "Имя может содержать не менее 3 символов")
    .max(100, "Имя не может быть длиннее 100 символов ")
    .matches(/^[A-Za-zА-Яа-яЁё]+$/, 'Имя может содержать только буквы'),
  lastName: yup
    .string()
    .min(3, "Фамилия может содержать не менее 3 символов")
    .max(100, "Фамилия не может быть длиннее 100 символов ")
    .matches(/^[A-Za-zА-Яа-яЁё]+$/, 'Имя может содержать только буквы'),
  password: yup
    .string()
    .required("Введите пароль")
    .matches(/^[\w#$]+$/, "Некорректный пароль. В пароле допускаются только буквы, цифры и знаки #%")
    .min(6, "Пароль должен быть не менее 6 символов")
    .max(60, "Пароль слишком длинный. Пожалуйста, введите пароль длиной не более 60 символов"),
  repeatPassword: yup
    .string()
    .required("Повторите пароль")
    .oneOf([yup.ref("password"), null], "Пароли должны совпадать"),
};

const loginShapeObject = {
  email: yup.string().required("Введите email"),
  password: yup.string().required("Введите пароль"),
};

export const getAuthFormParams = (isRegister) => {
  const authFormSchema = yup.object().shape(isRegister ? registerShapeObject : loginShapeObject);
  return isRegister
    ? {
        defaultValues: {
          login: "",
          email: "",
          password: "",
          repeatPassword: "",
          isDriver: false,
        },
        resolver: yupResolver(authFormSchema),
      }
    : {
        defaultValues: {
          email: "",
          password: "",
        },
        resolver: yupResolver(authFormSchema),
      };
};
