import "./TripCard.scss";
import { useContext } from "react";
import { UnconfirmedContext } from "../../context";
import { useNavigate } from "react-router";
import { LOCAL_TRIPS } from "../../constants";
export const TripCard = ({
  id,
  userID,
  dateTravel,
  timeTravel,
  fromWhere,
  toWhere,
  driver,
  passenger,
  passengersNumber,
  curUserIsDriver,
  modalState,
  setModalState,
}) => {
  const { unconfirmedTrips, setUnconfirmedTrips } = useContext(UnconfirmedContext);
  const navigate = useNavigate();
  const isUnconfirmedTrips = unconfirmedTrips?.find((i) => i.id === id);

  const onAddTripClick = () => {
    if (!isUnconfirmedTrips) {
      setUnconfirmedTrips((prevTrips) => [...prevTrips, { id: id, passengerPrice: passenger.price }]);
      setModalState({ id, isActive: true, passengerPrice: passenger.price });
    } else {
      let tripsArr = localStorage.getItem(LOCAL_TRIPS);
      if (!tripsArr) return;
      tripsArr = JSON.parse(tripsArr);
      const tripIndex = tripsArr.findIndex((i) => i.id === id);
      if (tripIndex > -1) tripsArr.splice(tripIndex, 1);
      localStorage.setItem(LOCAL_TRIPS, JSON.stringify(tripsArr));
      console.log(tripsArr);
      setUnconfirmedTrips(tripsArr);
    }
  };

  return (
    <div
      className="trip-card card"
      data-id={id}
      onClick={({ target }) => {
        if (target.dataset?.type !== "button") navigate(`${id}`);
      }}
    >
      <div className="trip-card__datetime card-body">
        <span className="trip-card__date">{dateTravel}</span>
        <span className="trip-card__time">{timeTravel}</span>
      </div>
      <div className="trip-card__route card-body">
        <span className="trip-card__from">{fromWhere}</span>
        <span className="trip-card__to">{toWhere}</span>
      </div>
      <div className="trip-card__people-info card-body">
        <div className="trip-card__driver card-body">
          <span className="trip-card__driver-name">Водитель: {driver?.userName ?? "Пока не найден"}</span>
        </div>
        <div className="trip-card__passenger card-body">
          <span className="trip-card__passenger-name">Создатель поездки: {passenger?.userName}</span>
        </div>
        <div className="trip-card__numberPassengers card-body">Пассажиров: {passengersNumber}</div>
      </div>
      {curUserIsDriver && userID !== driver?.id && (
        <button
          data-type="button"
          className={`trip-card__linkDriverBtn btn btn-${isUnconfirmedTrips ? "danger" : "primary"}`}
          onClick={onAddTripClick}
        >
          {isUnconfirmedTrips ? "х" : "+"}
        </button>
      )}
    </div>
  );
};
