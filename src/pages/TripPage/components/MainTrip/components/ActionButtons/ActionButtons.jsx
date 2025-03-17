import { Button } from "react-bootstrap";
import { ROLES, TRIP_STATUSES } from "../../../../../../constants";
import { Link } from "react-router";

export const ActionButtons = ({ trip, isDriver, userID, role, actions }) => {
  const { onApproveDriverClick, onUntieDriverClick, onCancelTripClick, onEditTripClick, onDeleteTripClick } = actions;
  return (
    <div className="d-flex gap-5">
      {!isDriver && trip?.status === TRIP_STATUSES.CORRECTED_PRICE.text && trip?.creator?.id === userID && (
        <>
          <Button onClick={onApproveDriverClick} className="btn-success">
            Утвердить водителя
          </Button>
          <Button onClick={onUntieDriverClick} className="btn-warning">
            Отвязать водителя
          </Button>
        </>
      )}
      {trip?.creator?.id === userID &&
        trip?.status !== TRIP_STATUSES.CANCEL.text &&
        trip?.status !== TRIP_STATUSES.SUCCESSFUL.text && (
          <Button onClick={onCancelTripClick} className="btn-danger">
            Отменить поездку
          </Button>
        )}
      {trip?.creator?.id === userID && trip?.status === TRIP_STATUSES.NEW.text && (
        <Link className="btn bg-dark text-light border-dark p-3" onClick={onEditTripClick}>
          Редактировать поездку
        </Link>
      )}
      {role === ROLES.ADMIN && trip?.id && (
        <button className="btn bg-dark text-light border-dark p-3" onClick={onDeleteTripClick}>
          Удалить поездку
        </button>
      )}
    </div>
  );
};
