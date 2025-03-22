import "./Trip.scss";
import { useContext, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { usePriceModalContext } from "../../../../hooks";
import { Comments, ConfirmModal, PriceModal } from "../../../../components";
import { UserInfoCard } from "../UserInfoCard";
import { selectTrip, selectUser } from "../../../../store";
import { addUnconfirmedTrip, getTripPrePrice, renderError } from "../../../../utils";
import { UnconfirmedContext } from "../../../../context";
import { CardHeader } from "../CardHeader";
import { RightArrow } from "../../../../icons/RightArrow";
import { TripPeoples } from "../TripPeoples";
import { ActionButtons } from "./components";
import { getOnClickActions } from "./utils";

export const Trip = ({
  setTripEdit,
  headerColor,
  updateHeaderColor,
  id,
  checkTokenExpired,
  navigate,
  dispatch,
  error,
}) => {
  const trip = useSelector(selectTrip);
  const prePrice = useMemo(() => getTripPrePrice(trip?.driver?.price, trip?.creator?.price), [trip]);
  const [confirmModalState, setConfirmModalState] = useState("");
  const [confirmModalShow, setConfirmModalShow] = useState(false);

  const modalShow = () => setConfirmModalShow(true);
  const modalHide = () => setConfirmModalShow(false);
  const { unconfirmedTrips, setUnconfirmedTrips } = useContext(UnconfirmedContext);
  const { priceModalView } = usePriceModalContext();

  const { id: userID, isDriver, role } = useSelector(selectUser);

  const isUnconfirmedTrips = unconfirmedTrips?.find((i) => i.id === id);

  useEffect(() => {
    updateHeaderColor();
  }, [trip]);

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
    ...getOnClickActions({
      id,
      checkTokenExpired: checkTokenExpired,
      dispatch: dispatch,
      modalShow: modalShow,
      navigate: navigate,
      prePrice,
      setConfirmModalState: setConfirmModalState,
    }),
    onEditTripClick: onEditTripClick,
  };

  return (
    <>
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
            <UserInfoCard userName={trip?.driver?.userName} userPrice={trip?.driver?.price} role={"driver"} />
            <UserInfoCard
              userName={trip?.creator?.userName}
              passengersNumber={trip.passengersNumber}
              userPrice={trip?.creator?.price}
              role={"passenger"}
            />
          </div>

          <div className="trip__comments">{<Comments />}</div>

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
    </>
  );
};
