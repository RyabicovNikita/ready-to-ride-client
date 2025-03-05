import { request } from "../utils";
import { TRIP_STATUSES } from "./../constants/statuses";

export const createTrip = (data) => request("trips/new", "POST", { ...data, status: TRIP_STATUSES.NEW });

export const getTrips = (onlyUserTrips = false, filter = []) => request("trips", "POST", { onlyUserTrips, filter });

export const getTripsByIDs = (idArray) => request("trips/getByIDs", "POST", { idArray });

export const confirmDriver = (idArray, driverID) => request("trips/confirmDriver", "POST", { idArray, driverID });

export const getTripByID = (id) => request(`trips/${id}`, "POST", { id });
