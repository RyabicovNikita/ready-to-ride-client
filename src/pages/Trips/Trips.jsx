import "./Trips.scss";
import { useContext, useEffect, useState } from "react";
import { TripCard } from "../../components";
import { getTrips, getTripsByIDs } from "../../api";
import { useError } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { addTripsInStore, logoutUserFromStore, selectTrips, selectUser } from "../../store";
import { useNavigate } from "react-router";
import { ModalContext, UnconfirmedContext } from "../../context";

export const Trips = ({ onlyUserTrips }) => {
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
    getTrips(onlyUserTrips).then((res) => {
      if (res?.error) {
        handleError(res);

        if (res.error === "jwt expired") {
          sessionStorage.removeItem("userData");
          dispatch(logoutUserFromStore());
          if (timeOutID) clearTimeout(timeOutID);
          timeOutID = setTimeout(() => {
            navigate("/login");
            modalView();
            resetError();
          }, 3000);
        }
        return;
      }

      dispatch(addTripsInStore(res.body));
    });

    return () => {
      clearTimeout(timeOutID);
      resetError();
    };
  }, []);

  useEffect(() => {
    let timeOutID;
    if (unconfirmedTripIDs.length === 0) return;
    getTripsByIDs(unconfirmedTripIDs).then((res) => {
      if (res?.error) {
        if (res.error === "jwt expired") {
          sessionStorage.removeItem("userData");
          dispatch(logoutUserFromStore());
          if (timeOutID) clearTimeout(timeOutID);
          timeOutID = setTimeout(() => {
            navigate("/login");
            modalView();
            resetError();
          }, 3000);
        }
        if (res.code === 404) setUncofirmedError({ code: res.code, error: "Нет не подтверждённых поездок" });
        else setUncofirmedError(res.error);
        return;
      }
      setUnconfirmedTrips(res.body);
    });
  }, [unconfirmedTripIDs]);

  return (
    <div className="d-flex flex-column gap-3">
      {isDriver && unconfirmedTripIDs.length > 0 ? (
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
      ) : null}
      <div className="trips card">
        <h5>Поездки</h5>
        {error ? (
          <div class="alert alert-danger" role="alert">
            {error === "jwt expired"
              ? "Ваш сеанс устарел, перенаправление на страницу авторизации..."
              : error?.message ?? error?.error ?? error}
          </div>
        ) : (
          <div className="d-flex flex-column align-items-center">
            <div class="form-floating mb-3 w-50">
              <input type="text" class="form-control" id="floatingInput" placeholder="Поиск..." />
              <label for="floatingInput">Поиск поездки</label>
            </div>
            {trips
              .filter((trip) => !unconfirmedTripIDs.includes(trip.id))
              .map((trip, index) => (
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
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
