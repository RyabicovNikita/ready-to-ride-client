import { useContext } from "react";
import "./TripCard.scss";
import { UnconfirmedContext } from "../../context";
import { LOCAL_TRIPS } from "../../constants";
import { useNavigate } from "react-router";
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
  handleShow,
  handleClose,
}) => {
  const { unconfirmedTrips, setUnconfirmedTrips } = useContext(UnconfirmedContext);
  const navigate = useNavigate();

  const onAddTripClick = () => {
    handleShow();
  };

  const isUnconfirmedTrips = unconfirmedTrips?.includes(id);
  return (
    <div
      className="trip-card card"
      onClick={({ target }) => {
        if (target.dataset?.type !== "button") navigate(`${id}`);
        else {
          handleShow();
        }
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
