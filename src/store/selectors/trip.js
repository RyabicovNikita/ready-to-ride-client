import { sortArrByCreateDate } from "../../formatters";

export const selectTrips = ({ trips }) => trips;

export const selectTrip = ({ trip }) => ({ ...trip, comments: sortArrByCreateDate(trip.comments) });
