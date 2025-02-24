import { request } from "../utils";
import { TRIP_STATUSES } from "./../constants/statuses";

export const createTrip = (data) => request("/trip", "POST", { ...data, status: TRIP_STATUSES.NEW });
