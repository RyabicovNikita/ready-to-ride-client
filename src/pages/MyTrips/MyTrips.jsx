import "./MyTrips.scss";
import { useContext, useEffect, useState } from "react";
import { TripCard } from "../../components";
import { getTrips, getTripsByIDs } from "../../api";
import { useError } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { addTripsInStore, logoutUserFromStore, selectTrips, selectUser } from "../../store";
import { useNavigate } from "react-router";
import { ModalContext, UnconfirmedContext } from "../../context";
import { USER_SESSION_KEY } from "../../constants";

export const MyTrips = ({ onlyUserTrips }) => {
  const [uncofirmedError, setUncofirmedError] = useState(null);
  const [unconfirmedTrips, setUnconfirmedTrips] = useState([]);
  const { modalView } = useContext(ModalContext);
  const { unconfirmedTrips: unconfirmedTripIDs } = useContext(UnconfirmedContext);
  const navigate = useNavigate();
  const trips = useSelector(selectTrips);
  const dispatch = useDispatch();
  const { error, handleError, resetError } = useError();
  const { isDriver } = useSelector(selectUser);

  useEffect(() => {
    let timeOutID;
    if (unconfirmedTripIDs.length === 0)
      return setUncofirmedError({ code: 404, error: "У вас нет не подтверждённых поездок! :)" });
    else setUncofirmedError(null);
    getTripsByIDs(unconfirmedTripIDs).then((res) => {
      if (res?.error) {
        if (res.error === "jwt expired") {
          sessionStorage.removeItem(USER_SESSION_KEY);
          dispatch(logoutUserFromStore());
          if (timeOutID) clearTimeout(timeOutID);
          timeOutID = setTimeout(() => {
            navigate("/login");
            modalView();
            resetError();
          }, 3000);
        } else setUncofirmedError(res);
        return;
      }
      setUnconfirmedTrips(res.body);
    });
  }, [unconfirmedTripIDs]);

  return (
    <div className="d-flex flex-column gap-3 w-100">
      <div className="notConfirmedTrips card">
        <h5>Неподтверждённые поездки</h5>
        {uncofirmedError ? (
          <div class={`alert alert-${uncofirmedError.code === 404 ? "success" : "danger"}`} role="alert">
            {uncofirmedError?.error}
          </div>
        ) : (
          unconfirmedTrips.map((trip, index) => (
            <TripCard
              id={trip.id}
              curUserIsDriver={isDriver}
              key={index}
              dateTravel={trip.dateTravel}
              timeTravel={trip.timeTravel}
              driverName={trip.driver}
              passenger={trip.creator}
              fromWhere={trip.fromWhere}
              toWhere={trip.toWhere}
              passengersNumber={trip.passengersNumber}
            />
          ))
        )}
      </div>
      <div className="d-flex w-100 justify-content-center">
        <button className="btn btn-primary w-25">Подтвердить</button>
      </div>
    </div>
  );
};
