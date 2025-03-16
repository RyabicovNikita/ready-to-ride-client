import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CITIES, TRIP_STATUSES } from "../../../constants";

const shapeTrip = {
  fromWhere: yup
    .string()
    .required("Выберите откуда будете выезжать")
    .notOneOf([CITIES[0]], "Выберите откуда будете выезжать"),
  toWhere: yup
    .string()
    .required("Выберите куда хотите поехать")
    .notOneOf([CITIES[0]], "Выберите куда хотите поехать")
    .notOneOf([yup.ref("fromWhere")], "Выберите разные пункты назначения"),

  passengerPrice: yup.number().required("Укажите стоимость поездки").moreThan(0, "Стоимость должна быть больше 0"),

  numberPeople: yup
    .number()
    .required("Укажите кол-во человек")
    .moreThan(0, "В поездке должен быть как минимум 1 человек"),
  status: yup.string(),
};

const tripFormSchema = yup.object().shape(shapeTrip);

export const tripFormParams = {
  defaultValues: {
    fromWhere: CITIES[0],
    toWhere: CITIES[0],
    passengerPrice: 0,
    createdBy: null,
    status: TRIP_STATUSES.NEW.text,
    numberPeople: 1,
    totalPrice: 0,
    userId: null,
  },
  resolver: yupResolver(tripFormSchema),
};
