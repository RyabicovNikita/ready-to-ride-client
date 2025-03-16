import "./TripCard.scss";
import { useContext, useEffect, useState } from "react";
import { UnconfirmedContext } from "../../context";
import { useNavigate } from "react-router";
import { addUnconfirmedTrip } from "../../utils";
import { TRIP_STATUSES } from "../../constants";
import { usePriceModalContext } from "../../hooks";
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
  status,
}) => {
  const [headerColor, setHeaderColor] = useState("white");
  const { unconfirmedTrips, setUnconfirmedTrips } = useContext(UnconfirmedContext);
  const { priceModalView } = usePriceModalContext();
  const navigate = useNavigate();
  const isUnconfirmedTrips = unconfirmedTrips?.find((i) => i.id === id);
  const updateHeaderColor = () => {
    if (!status) return;
    const statusData = Object.values(TRIP_STATUSES).find((i) => i.text === status);

    setHeaderColor(statusData?.color ?? "white");
  };

  useEffect(() => {
    updateHeaderColor();
  }, [status]);
  return (
    <div
      className="trip-card card"
      data-id={id}
      onClick={({ target }) => {
        if (target.dataset?.type !== "button") navigate(`/trips/${id}`);
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
      {curUserIsDriver && userID !== driver?.id && !driver?.userName && status === TRIP_STATUSES.NEW.text && (
        <button
          data-type="button"
          className={`trip-card__linkDriverBtn btn btn-${isUnconfirmedTrips ? "danger" : "primary"}`}
          onClick={() =>
            addUnconfirmedTrip({ curTripID: id, passenger, priceModalView, setUnconfirmedTrips, unconfirmedTrips })
          }
        >
          {isUnconfirmedTrips ? "х" : "+"}
        </button>
      )}
      <div className="trip-card__statusLine" style={{ backgroundColor: headerColor }}>
        {status}
      </div>
    </div>
  );
};
