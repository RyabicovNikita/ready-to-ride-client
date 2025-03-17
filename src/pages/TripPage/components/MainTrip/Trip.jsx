import "./Trip.scss";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { cancelTrip, confirmDriver, deleteTrip, getTripByID, looseDriver } from "../../../../api";
import { useError, useLoader, usePriceModalContext } from "../../../../hooks";
import { ConfirmModal, Loader, MgContainer, PriceModal } from "../../../../components";
import { UserInfoCard } from "../UserInfoCard";
import { selectUser } from "../../../../store";
import { addUnconfirmedTrip, logoutUserIfTokenExpired, renderError } from "../../../../utils";
import { UnconfirmedContext } from "../../../../context";
import { ROLES, TRIP_STATUSES } from "../../../../constants";

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

  const onConfirmDriver = () => {
    confirmDriver(id, prePrice).then((res) => {
      if (res.error) {
        checkTokenExpired(res.error);
        return;
      }
      setTrip((prevState) => ({ ...prevState, status: TRIP_STATUSES.READY.text, totalPrice: prePrice }));
    });
  };
  const onLooseDriver = () => {
    looseDriver(id).then((res) => {
      if (res.error) {
        checkTokenExpired(res.error);
        return;
      }
      setTrip((prevState) => ({ ...prevState, status: TRIP_STATUSES.NEW.text, totalPrice: 0, driver: null }));
    });
  };

  const onCancelTrip = () => {
    cancelTrip(id).then((res) => {
      if (res.error) {
        checkTokenExpired(res.error);
        return;
      }
      setTrip((prevState) => ({ ...prevState, status: TRIP_STATUSES.CANCEL.text }));
    });
  };

  const onDeleteTrip = () => {
    deleteTrip(id).then((res) => {
      if (res.error) {
        checkTokenExpired(res.error);
        return;
      }
      navigate("/trips");
    });
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
              <div className="trip__header" style={{ backgroundColor: headerColor }}>
                <span>{trip.status}</span>
                <div className="trip__container">
                  <div className="trip__cities">
                    <span>{trip.fromWhere}</span>
                    <i class="bi bi-arrow-right"></i>
                    <span>{trip.toWhere}</span>
                  </div>
                </div>
              </div>

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
                <div className="trip__footer-count">
                  <div className="trip__footer-pass-count">
                    <span>{trip.passengersNumber}</span>
                    <i class="bi bi-people-fill"></i>
                  </div>
                </div>

                <div className="d-flex gap-5">
                  {!isDriver && trip?.status === TRIP_STATUSES.CORRECTED_PRICE.text && trip?.creator?.id === userID && (
                    <>
                      <Button
                        onClick={() => {
                          setConfirmModalState({
                            title: "Утверждение водителя",
                            message: "После утверждения водителя цена станет фиксированной, вы уверены?",
                            onAccept: onConfirmDriver,
                          });
                          modalShow();
                        }}
                        className="btn-success"
                      >
                        Утвердить водителя
                      </Button>
                      <Button
                        onClick={() => {
                          setConfirmModalState({
                            title: "Отвязать водителя",
                            message: "Данное действие нельзя отменить, вы уверены?",
                            onAccept: onLooseDriver,
                          });
                          modalShow();
                        }}
                        className="btn-warning"
                      >
                        Отвязать водителя
                      </Button>
                    </>
                  )}
                  {trip?.creator?.id === userID &&
                    trip?.status !== TRIP_STATUSES.CANCEL.text &&
                    trip?.status !== TRIP_STATUSES.SUCCESSFUL.text && (
                      <Button
                        onClick={() => {
                          setConfirmModalState({
                            title: "Отмена поездки",
                            message: "Данное действие нельзя отменить, вы уверены?",
                            onAccept: onCancelTrip,
                          });
                          modalShow();
                        }}
                        className="btn-danger"
                      >
                        Отменить поездку
                      </Button>
                    )}
                  {trip?.creator?.id === userID && trip?.status === TRIP_STATUSES.NEW.text && (
                    <Link className="btn bg-dark text-light border-dark p-3" onClick={() => setTripEdit(true)}>
                      Редактировать поездку
                    </Link>
                  )}
                  {role === ROLES.ADMIN && trip?.id && (
                    <button className="btn bg-dark text-light border-dark p-3" onClick={onDeleteTrip}>
                      Удалить поездку
                    </button>
                  )}
                </div>

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
                      onClick={() =>
                        addUnconfirmedTrip({
                          curTripID: id,
                          passenger: trip.creator,
                          priceModalView: priceModalView,
                          setUnconfirmedTrips,
                          unconfirmedTrips,
                        })
                      }
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
