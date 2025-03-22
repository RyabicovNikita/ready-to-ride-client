export const getTripPrePrice = (begDriverPrice = 0, begPassengerPrice = 0) => {
  const driverPrice = Number(begDriverPrice);
  const passengerPrice = Number(begPassengerPrice);

  if (driverPrice === passengerPrice) return passengerPrice;

  if (driverPrice === 0 || isNaN(driverPrice)) {
    if (passengerPrice === 0 || isNaN(passengerPrice)) return 0;
    return passengerPrice;
  }

  return (driverPrice + passengerPrice) / 2;
};
