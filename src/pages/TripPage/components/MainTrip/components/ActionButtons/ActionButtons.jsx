import "./ActionButtons.scss"
import { Button } from "react-bootstrap";
import { ROLES, TRIP_STATUSES } from "../../../../../../constants";
import { Link } from "react-router";

export const ActionButtons = ({ trip, isDriver, userID, role, actions }) => {
  const { onApproveDriverClick, onUntieDriverClick, onCancelTripClick, onEditTripClick, onDeleteTripClick } = actions;
  return (
    <div className="actions d-flex">
      {!isDriver && trip?.status === TRIP_STATUSES.CORRECTED_PRICE.text && trip?.creator?.id === userID && (
        <>
          <Button onClick={onApproveDriverClick} className="actions__action btn-success">
            Утвердить водителя
          </Button>
          <Button onClick={onUntieDriverClick} className="actions__action btn-warning">
            Отвязать водителя
          </Button>
        </>
      )}
      {trip?.creator?.id === userID &&
        trip?.status !== TRIP_STATUSES.CANCEL.text &&
        trip?.status !== TRIP_STATUSES.SUCCESSFUL.text && (
          <Button onClick={onCancelTripClick} className="actions__action btn-danger">
            Отменить поездку
          </Button>
        )}
      {trip?.creator?.id === userID && trip?.status === TRIP_STATUSES.NEW.text && (
        <Link className="actions__action btn bg-dark text-light border-dark p-3" onClick={onEditTripClick}>
          Редактировать поездку
        </Link>
      )}
      {role === ROLES.ADMIN && trip?.id && (
        <button className="actions__action btn bg-dark text-light border-dark p-3" onClick={onDeleteTripClick}>
          Удалить поездку
        </button>
      )}
    </div>
  );
};
