import { request } from "../utils";
import { TRIP_STATUSES } from "./../constants/statuses";

export const createTrip = (data) => request("trips", "POST", { ...data, status: TRIP_STATUSES.NEW });

export const getTrips = (onlyUserTrips = false) => request("trips", "POST", { onlyUserTrips });

export const getTripsByIDs = (idArray) => request("trips/getByIDs", "POST", { idArray });
