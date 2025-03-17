import "./Trip.scss";
import { useCallback, useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { cancelTrip, confirmDriver, deleteTrip, getTripByID, looseDriver } from "../../../../api";
import { useError, useLoader, usePriceModalContext } from "../../../../hooks";
import { ConfirmModal, Loader, MgContainer, PriceModal } from "../../../../components";
import { UserInfoCard } from "../UserInfoCard";
import { selectUser } from "../../../../store";
import { addUnconfirmedTrip, logoutUserIfTokenExpired, renderError } from "../../../../utils";
import { UnconfirmedContext } from "../../../../context";
import { TRIP_STATUSES } from "../../../../constants";
import { CardHeader } from "../CardHeader";
import { RightArrow } from "../../../../icons/RightArrow";
import { TripPeoples } from "../TripPeoples";
import { ActionButtons } from "./components";

export const Trip = ({
  setTripEdit,
  trip,
  setTrip,
  headerColor,
  updateHeaderColor,
  id,
  authModalView,
  prePrice,
  navigate,
  dispatch,
}) => {
  const confirmQuestion = "Данное действие нельзя отменить, вы уверены?";
  const [confirmModalState, setConfirmModalState] = useState("");
  const [confirmModalShow, setConfirmModalShow] = useState(false);

  const checkTokenExpired = useCallback(
    (error) => logoutUserIfTokenExpired({ error, handleError, dispatch, navigate, authModalView, resetError }),
    []
  );

  const modalShow = () => setConfirmModalShow(true);
  const modalHide = () => setConfirmModalShow(false);
  const { unconfirmedTrips, setUnconfirmedTrips } = useContext(UnconfirmedContext);
  const { priceModalView } = usePriceModalContext();

  const { error, resetError, handleError } = useError();
  const { loading, hideLoader, showLoader } = useLoader();

  const { id: userID, isDriver, role } = useSelector(selectUser);

  const isUnconfirmedTrips = unconfirmedTrips?.find((i) => i.id === id);

  useEffect(() => {
    showLoader();
    getTripByID(id).then((res) => {
      hideLoader();
      if (res.error) {
        checkTokenExpired(res.error);
        return;
      }
      setTrip(res.body);
    });
  }, []);

  useEffect(() => {
    updateHeaderColor();
  }, [trip.status]);

  const handleConfirmDriver = () => {
    confirmDriver(id, prePrice).then((res) => {
      if (res.error) {
        checkTokenExpired(res.error);
        return;
      }
      setTrip((prevState) => ({ ...prevState, status: TRIP_STATUSES.READY.text, totalPrice: prePrice }));
    });
  };
  const handleLooseDriver = () => {
    looseDriver(id).then((res) => {
      if (res.error) {
        checkTokenExpired(res.error);
        return;
      }
      setTrip((prevState) => ({ ...prevState, status: TRIP_STATUSES.NEW.text, totalPrice: 0, driver: null }));
    });
  };

  const handleCancelTrip = () => {
    cancelTrip(id).then((res) => {
      if (res.error) {
        checkTokenExpired(res.error);
        return;
      }
      setTrip((prevState) => ({ ...prevState, status: TRIP_STATUSES.CANCEL.text }));
    });
  };

  const onDeleteTripClick = () => {
    deleteTrip(id).then((res) => {
      if (res.error) {
        checkTokenExpired(res.error);
        return;
      }
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

  const onUncofirmedTripsClick = () =>
    addUnconfirmedTrip({
      curTripID: id,
      passenger: trip.creator,
      priceModalView: priceModalView,
      setUnconfirmedTrips,
      unconfirmedTrips,
    });

  const onEditTripClick = () => setTripEdit(true);

  const clickActions = {
    onApproveDriverClick,
    onUntieDriverClick,
    onCancelTripClick,
    onEditTripClick,
    onDeleteTripClick,
  };

  return (
    <>
      {loading && <Loader />}
      <MgContainer
        style={{
          placeItems: "center",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <Container className="trip" style={{ filter: `blur(${loading ? "10px" : "0"})` }}>
          <PriceModal />
          <ConfirmModal show={confirmModalShow} modalHide={modalHide} data={confirmModalState} />
          {renderError(error)}
          {!error && (
            <>
              <CardHeader headerColor={headerColor} trip={trip}>
                <span>{trip.fromWhere}</span>
                <RightArrow />
                <span>{trip.toWhere}</span>
              </CardHeader>

              <div className="trip__content">
                <UserInfoCard
                  userName={trip?.driver?.userName ?? "Пока не найден"}
                  userPrice={trip?.driver?.price}
                  role={"driver"}
                />
                <UserInfoCard
                  userName={trip?.creator?.userName}
                  passengersNumber={trip.passengersNumber}
                  userPrice={trip?.creator?.price}
                  role={"passenger"}
                />
              </div>
              <div className="trip__footer">
                <TripPeoples>
                  <span>{trip.passengersNumber}</span>
                </TripPeoples>
                <ActionButtons isDriver={isDriver} role={role} trip={trip} userID={userID} actions={clickActions} />
                <div className="trip__footer-totalPrice">
                  <div className="trip__footer-totalPrice-container">
                    {trip.totalPrice > 0 ? (
                      trip.totalPrice + " ₽"
                    ) : (
                      <div className="d-flex flex-column">
                        <span>Стоимость в обсуждении...</span>
                        <span className="trip__userCard-price">Предварительно {prePrice} ₽</span>
                      </div>
                    )}
                  </div>
                  {isDriver && !trip?.driver?.userName && (
                    <button
                      className={`btn ${isUnconfirmedTrips ? "btn-danger" : "btn-dark"}`}
                      onClick={onUncofirmedTripsClick}
                    >
                      {isUnconfirmedTrips ? "Не едем" : "Едем"}
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </Container>
      </MgContainer>
    </>
  );
};
