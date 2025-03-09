import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const shapeFilteredTrip = {};

const filteredTripFormSchema = yup.object().shape(shapeFilteredTrip);

export const filteredTripFormParams = {
  defaultValues: {},
  resolver: yupResolver(filteredTripFormSchema),
};
