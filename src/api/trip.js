import { request } from "../utils";
import { TRIP_STATUSES } from "./../constants/statuses";

export const createTrip = (data) => request("trips/new", "POST", { ...data, status: TRIP_STATUSES.NEW.text });

export const getTrips = (onlyUserTrips = false, filter = []) => request("trips", "POST", { onlyUserTrips, filter });

export const getTripsByIDs = (idArray) => request("trips/getByIDs", "POST", { idArray });

export const addDriverInTrips = (tripsData, driverID) =>
  request("trips/addDriverInTrips", "POST", { tripsData, driverID });

export const getTripByID = (id) => request(`trips/${id}`, "POST", { id });

export const confirmDriver = (tripID, totalPrice) => request("trips/confirmDriver", "POST", { id: tripID, totalPrice });

export const cancelTrip = (id) => request("trips/cancelTrip", "POST", { id });

export const looseDriver = (tripID) => request("trips/looseDriver", "POST", { id: tripID });
