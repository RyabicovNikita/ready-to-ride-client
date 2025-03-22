import "./TravelInfoCard.scss";
import { RightArrow } from "../../../../icons/RightArrow";

export const TravelInfoCard = ({ fromWhere, toWhere, dateTravel, timeTravel }) => (
  <div className="trip__travel">
    <div className="trip__travel-places">
      <span>{fromWhere}</span>
      <RightArrow />
      <span>{toWhere}</span>
    </div>
    <div className="trip__travel-datetime">
      <div className="trip__travel-date">
        <i class="bi bi-calendar-event"></i>
        <span>{dateTravel}</span>
      </div>
      <div className="trip__travel-time">
        <i class="bi bi-clock"></i>
        <span>{timeTravel}</span>
      </div>
    </div>
  </div>
);
