import { cancelTrip, confirmDriver, looseDriver } from "../../../../../api";
import { redCancelTrip, redConfirmDriver, redLooseDriver } from "../../../../../store";

export const getHandlers = ({ id, prePrice, checkTokenExpired, dispatch }) => {
  const handleConfirmDriver = () => {
    confirmDriver(id, prePrice).then((res) => {
      if (res.error) {
        checkTokenExpired(res.error);
        return;
      }
      dispatch(redConfirmDriver(id, prePrice));
    });
  };
  const handleLooseDriver = () => {
    looseDriver(id).then((res) => {
      if (res.error) {
        checkTokenExpired(res.error);
        return;
      }
      dispatch(redLooseDriver(id));
    });
  };

  const handleCancelTrip = () => {
    cancelTrip(id).then((res) => {
      if (res.error) {
        checkTokenExpired(res.error);
        return;
      }
      dispatch(redCancelTrip());
    });
  };
  return {
    handleConfirmDriver: handleConfirmDriver,
    handleLooseDriver: handleLooseDriver,
    handleCancelTrip: handleCancelTrip,
  };
};
