import { LOCAL_TRIPS } from "../constants";

export const addUnconfirmedTrip = ({
  unconfirmedTrips,
  setUnconfirmedTrips,
  setPriceModalState,
  curTripID,
  passenger,
}) => {
  const isUnconfirmedTrips = unconfirmedTrips?.find((i) => i.id === curTripID);
  if (!isUnconfirmedTrips) {
    setUnconfirmedTrips((prevTrips) => [...prevTrips, { id: curTripID, passengerPrice: passenger.price }]);
    setPriceModalState({ id: curTripID, isActive: true, passengerPrice: passenger.price });
  } else {
    let tripsArr = localStorage.getItem(LOCAL_TRIPS);
    if (!tripsArr) return;
    tripsArr = JSON.parse(tripsArr);
    const tripIndex = tripsArr.findIndex((i) => i.id === curTripID);
    if (tripIndex > -1) tripsArr.splice(tripIndex, 1);
    localStorage.setItem(LOCAL_TRIPS, JSON.stringify(tripsArr));
    setUnconfirmedTrips(tripsArr);
  }
};
