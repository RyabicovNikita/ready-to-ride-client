export const CardHeader = ({ status, statusColor }) => (
  <div className="trip__header " style={{ backgroundColor: statusColor }}>
    <div className="w-100 d-flex align-items-flex-start justify-content-center h-100">
      <span className="d-flex h-100 align-items-center">{status}</span>
    </div>
  </div>
);
