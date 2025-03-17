import { PeoplesFill } from "../../../../icons/PeoplesFill";

export const TripPeoples = ({ children }) => (
  <div className="trip__footer-count">
    <div className="trip__footer-pass-count">
      {children}
      <PeoplesFill />
    </div>
  </div>
);
