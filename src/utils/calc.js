export const getTripPrePrice = (trip) => {
  const driverPrice = Number(trip?.driver?.price ?? 0);
  const passengerPrice = Number(trip?.creator?.price ?? 0);

  if (driverPrice === 0 || isNaN(driverPrice)) {
    if (passengerPrice === 0 || isNaN(passengerPrice)) return 0;
    return passengerPrice;
  }

  return (driverPrice + passengerPrice) / 2;
};
