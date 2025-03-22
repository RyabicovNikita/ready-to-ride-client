export const CardHeader = ({ children, trip }) => (
  <div className="trip__header " style={{ backgroundColor: trip.statusColor }}>
    <span className="d-flex h-100 align-items-center">{trip.status}</span>
    <div className="trip__container">
      <div className="trip__cities">{children}</div>
    </div>
  </div>
);
