import "./Trip.scss";
import { useContext, useEffect, useState } from "react";
import { cancelTrip, confirmDriver, getTripByID, looseDriver } from "../../api";
import { useNavigate, useParams } from "react-router";
import { Button, Container } from "react-bootstrap";
import { useError, useLoader } from "../../hooks";
import { ConfirmModal, Loader, MgContainer } from "../../components";
import { UserInfoCard } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserFromStore, selectUser } from "../../store";
import { addUnconfirmedTrip } from "../../utils";
import { UnconfirmedContext } from "../../context";
import { TRIP_STATUSES, USER_SESSION_KEY } from "../../constants";
import { PriceModal } from "../Trips/components";

export const Trip = ({ setPriceModalState, priceModalState, authModalView }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmModalState, setConfirmModalState] = useState("");
  const [confirmModalShow, setConfirmModalShow] = useState(false);
  const [headerColor, setHeaderColor] = useState("white");
  const modalShow = () => setConfirmModalShow(true);
  const modalHide = () => setConfirmModalShow(false);
  const { unconfirmedTrips, setUnconfirmedTrips } = useContext(UnconfirmedContext);
  const { error, resetError, handleError } = useError();
  const { loading, hideLoader, showLoader } = useLoader();
  const { id } = useParams();
  const [trip, setTrip] = useState({});
  const { id: userID, isDriver } = useSelector(selectUser);

  const isUnconfirmedTrips = unconfirmedTrips?.find((i) => i.id === Number(id));
  const getPrePrice = () => {
    const driverPrice = Number(trip?.driver?.price ?? 0);
    const passengerPrice = Number(trip?.creator?.price ?? 0);

    if (driverPrice === 0 || isNaN(driverPrice)) {
      if (passengerPrice === 0 || isNaN(passengerPrice)) return 0;
      return passengerPrice;
    }

    return (driverPrice + passengerPrice) / 2;
  };

  useEffect(() => {
    showLoader();
    getTripByID(Number(id)).then((res) => {
      hideLoader();
      if (res.error) {
        let timeOutID;
        handleError(res.error);
        if (res.error === "jwt expired") {
          sessionStorage.removeItem(USER_SESSION_KEY);
          dispatch(logoutUserFromStore());
          if (timeOutID) clearTimeout(timeOutID);
          timeOutID = setTimeout(() => {
            navigate("/login");
            authModalView();
            resetError();
          }, 3000);
        }
        return;
      }
      setTrip(res.body);
    });
  }, []);

  const updateHeaderColor = () => {
    if (!trip.status) return;
    const status = Object.values(TRIP_STATUSES).find((status) => status.text === trip.status);

    setHeaderColor(status?.color ?? "white");
  };

  useEffect(() => {
    updateHeaderColor();
  }, [trip.status]);

  const onConfirmDriver = () => {
    const calcTotalPrice = getPrePrice();
    confirmDriver(trip.id, calcTotalPrice).then((res) => {
      if (res.error) {
        let timeOutID;
        handleError(res.error);
        if (res.error === "jwt expired") {
          sessionStorage.removeItem(USER_SESSION_KEY);
          dispatch(logoutUserFromStore());
          if (timeOutID) clearTimeout(timeOutID);
          timeOutID = setTimeout(() => {
            navigate("/login");
            authModalView();
            resetError();
          }, 3000);
        }
        return;
      }
      setTrip((prevState) => ({ ...prevState, status: TRIP_STATUSES.READY.text, totalPrice: calcTotalPrice }));
    });
  };
  const onLooseDriver = () => {
    looseDriver(trip.id).then((res) => {
      if (res.error) {
        let timeOutID;
        handleError(res.error);
        if (res.error === "jwt expired") {
          sessionStorage.removeItem(USER_SESSION_KEY);
          dispatch(logoutUserFromStore());
          if (timeOutID) clearTimeout(timeOutID);
          timeOutID = setTimeout(() => {
            navigate("/login");
            authModalView();
            resetError();
          }, 3000);
        }
        return;
      }
      setTrip((prevState) => ({ ...prevState, status: TRIP_STATUSES.NEW.text, totalPrice: 0, driver: null }));
    });
  };

  const onCancelTrip = () => {
    cancelTrip(trip.id).then((res) => {
      if (res.error) {
        let timeOutID;
        handleError(res.error);
        if (res.error === "jwt expired") {
          sessionStorage.removeItem(USER_SESSION_KEY);
          dispatch(logoutUserFromStore());
          if (timeOutID) clearTimeout(timeOutID);
          timeOutID = setTimeout(() => {
            navigate("/login");
            authModalView();
            resetError();
          }, 3000);
        }
        return;
      }
      setTrip((prevState) => ({ ...prevState, status: TRIP_STATUSES.CANCEL.text }));
    });
  };

  return (
    <MgContainer
      style={{
        placeItems: "center",
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
    >
      {loading && <Loader />}
      <Container className="trip" style={{ filter: `blur(${loading ? "10px" : "0"})` }}>
        <PriceModal show={priceModalState} modalState={priceModalState} setModalState={setPriceModalState} />
        <ConfirmModal show={confirmModalShow} modalHide={modalHide} data={confirmModalState} />
        {error && (
          <div class="alert alert-danger" role="alert">
            {error === "jwt expired"
              ? "Ваш сеанс устарел, перенаправление на страницу авторизации..."
              : error?.message ?? error?.error ?? error}
          </div>
        )}
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
              <UserInfoCard userName={trip?.driver?.userName} userPrice={trip?.driver?.price} role={"driver"} />
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
              </div>

              <div className="trip__footer-totalPrice">
                <div className="trip__footer-totalPrice-container">
                  {trip.totalPrice > 0 ? (
                    trip.totalPrice + " ₽"
                  ) : (
                    <div className="d-flex flex-column">
                      <span>Стоимость в обсуждении...</span>
                      <span className="trip__userCard-price">Предварительно {getPrePrice()} ₽</span>
                    </div>
                  )}
                </div>
                {isDriver && !trip?.driver?.userName && (
                  <button
                    className={`btn ${isUnconfirmedTrips ? "btn-danger" : "btn-primary"}`}
                    onClick={() =>
                      addUnconfirmedTrip({
                        curTripID: trip.id,
                        passenger: trip.creator,
                        setPriceModalState,
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
  );
};
