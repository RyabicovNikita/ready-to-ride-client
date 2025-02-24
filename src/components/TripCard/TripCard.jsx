import "./TripCard.scss";
export const TripCard = ({ dateTravel, timeTravel, fromWhere, toWhere, driverName, passenger, passengersNumber }) => (
  <div className="trip-card">
    <div className="trip-card__datetime">
      <span className="trip-card__date">{dateTravel}</span>
      <span className="trip-card__time">{timeTravel}</span>
    </div>
    <div className="trip-card__route">
      <span className="trip-card__from">{fromWhere}</span>
      <span className="trip-card__to">{toWhere}</span>
    </div>
    <div className="trip-card__people-info">
      <div className="trip-card__driver">
        <span className="trip-card__driver-name">{driverName}</span>
      </div>
      <div className="trip-card__passenger">
        <span className="trip-card__passenger-name">{passenger.userName}</span>
      </div>
      <div className="trip-card__numberPassengers">{passengersNumber}</div>
    </div>
    <button className="trip-card__linkDriverBtn">+</button>
  </div>
);
