import "./Trips.scss";
import { useContext, useEffect } from "react";
import { Loader, TripCard } from "../../components";
import { getTrips } from "../../api";
import { useError, useLoader } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { addTripsInStore, logoutUserFromStore, selectTrips, selectUser } from "../../store";
import { useNavigate } from "react-router";
import { ModalContext } from "../../context";
import { USER_SESSION_KEY } from "../../constants";

export const Trips = ({ onlyUserTrips }) => {
  const { loading, showLoader, hideLoader } = useLoader();
  const { modalView } = useContext(ModalContext);

  const navigate = useNavigate();
  const trips = useSelector(selectTrips);
  const dispatch = useDispatch();
  const { error, handleError, resetError } = useError();
  const { id: userID, isDriver } = useSelector(selectUser);
  useEffect(() => {
    showLoader();
    let timeOutID;
    getTrips(onlyUserTrips).then((res) => {
      hideLoader();
      if (res?.error) {
        handleError(res);

        if (res.error === "jwt expired") {
          sessionStorage.removeItem(USER_SESSION_KEY);
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

  return (
    <div className="d-flex flex-column gap-3 h-100">
      {loading && <Loader />}
      <div className="trips card">
        {error ? (
          <div class="alert alert-danger" role="alert">
            {error === "jwt expired"
              ? "Ваш сеанс устарел, перенаправление на страницу авторизации..."
              : error?.message ?? error?.error ?? error}
          </div>
        ) : (
          <div className="d-flex flex-column align-items-center">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Фильтры</h5>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" defaultChecked={true} id="flexCheckDefault" />
                  <label class="form-check-label" for="flexCheckDefault">
                    Водитель не найден
                  </label>
                </div>
              </div>
            </div>
            {trips.map((trip, index) => (
              <TripCard
                id={trip.id}
                userID={userID}
                curUserIsDriver={isDriver}
                key={index}
                dateTravel={trip.dateTravel}
                timeTravel={trip.timeTravel}
                driver={trip.driver}
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
