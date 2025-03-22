import { TRIP_STATUSES } from "../../constants";

export const selectTrips = ({ trips }) =>
  trips?.map((trip) => ({
    ...trip,
    statusColor: Object.values(TRIP_STATUSES).find((status) => status.text === trip?.status)?.color ?? "white",
  }));

export const selectTrip = ({ trip }) => ({
  ...trip,
  statusColor: Object.values(TRIP_STATUSES).find((status) => status.text === trip?.status)?.color ?? "white",
});
