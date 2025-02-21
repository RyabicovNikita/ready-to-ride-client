import { request } from "../utils";

export const createTrip = (data) => request("/new", "POST", data);
