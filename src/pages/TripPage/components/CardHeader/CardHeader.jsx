export const CardHeader = ({ children, trip, headerColor }) => (
  <div className="trip__header " style={{ backgroundColor: headerColor }}>
    <span className="d-flex h-100 align-items-center">{trip.status}</span>
    <div className="trip__container">
      <div className="trip__cities">{children}</div>
    </div>
  </div>
);
