import { useEffect } from "react";
import { TripCard } from "../../components";
import { getTrips } from "../../api";
import { useError } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { addTripsInStore, logoutUserFromStore, selectTrips } from "../../store";
import "./Trips.scss";
import { useNavigate } from "react-router";

export const Trips = ({ onlyUserTrips }) => {
  const navigate = useNavigate();
  const trips = useSelector(selectTrips);
  const dispatch = useDispatch();
  const { error, handleError, resetError } = useError();
  useEffect(() => {
    let timeOutID;
    getTrips(onlyUserTrips).then((res) => {
      if (res?.error) {
        handleError(res);
        if (res.code === 401) {
          sessionStorage.removeItem("userData");
          dispatch(logoutUserFromStore());
        }
        if (timeOutID) clearTimeout(timeOutID);
        timeOutID = setTimeout(() => {
          resetError();
          navigate("/login");
        }, 3000);
        return;
      }
      dispatch(addTripsInStore(res.body));
    });
    return () => clearTimeout(timeOutID);
  }, []);

  return (
    <div className="trips">
      <div class="position-fixed bottom-0 end-0 p-3">
        <div id="liveToast" class={`toast show`} role="alert" aria-live="assertive" aria-atomic="true">
          <div class="toast-header">
            <strong class="me-auto">Внимание</strong>
            <small>Только что</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body">{error.message || error}</div>
        </div>
      </div>
      {trips.map((trip, index) => (
        <TripCard
          key={index}
          dateTravel={trip.dateTravel}
          timeTravel={trip.timeTravel}
          driverName={trip.driver}
          passenger={trip.creator}
          fromWhere={trip.fromWhere}
          toWhere={trip.toWhere}
          passengersNumber={trip.passengersNumber}
        />
      ))}
    </div>
  );
};
