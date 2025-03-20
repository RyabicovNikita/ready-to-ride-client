import { deleteTrip } from "../../../../../api";
import { confirmQuestion } from "../../../../../constants";
import { redDeleteTrip } from "../../../../../store";
import { getHandlers } from "./handlers";

export const getOnClickActions = ({
  id,
  prePrice,
  dispatch,
  checkTokenExpired,
  navigate,
  setConfirmModalState,
  modalShow,
}) => {
  const { handleCancelTrip, handleConfirmDriver, handleLooseDriver } = getHandlers({
    id,
    prePrice,
    checkTokenExpired: checkTokenExpired,
    dispatch: dispatch,
  });
  const onDeleteTripClick = () => {
    deleteTrip(id).then((res) => {
      if (res.error) {
        checkTokenExpired(res.error);
        return;
      }
      dispatch(redDeleteTrip());
      navigate("/trips");
    });
  };

  const onApproveDriverClick = () => {
    setConfirmModalState({
      title: "Утверждение водителя",
      message: "После утверждения водителя цена станет фиксированной, вы уверены?",
      onAccept: handleConfirmDriver,
    });
    modalShow();
  };

  const onUntieDriverClick = () => {
    setConfirmModalState({
      title: "Отвязать водителя",
      message: confirmQuestion,
      onAccept: handleLooseDriver,
    });
    modalShow();
  };

  const onCancelTripClick = () => {
    setConfirmModalState({
      title: "Отмена поездки",
      message: confirmQuestion,
      onAccept: handleCancelTrip,
    });
    modalShow();
  };

  return {
    onApproveDriverClick,
    onUntieDriverClick,
    onCancelTripClick,
    onDeleteTripClick,
  };
};
