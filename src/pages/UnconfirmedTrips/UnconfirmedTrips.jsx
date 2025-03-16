import "./UnconfirmedTrips.scss";
import { useContext, useEffect, useState } from "react";
import { Loader, TripCard } from "../../components";
import { getTripsByIDs } from "../../api";
import { useLoader } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserFromStore, selectUser } from "../../store";
import { useNavigate } from "react-router";
import { AuthModalContext, UnconfirmedContext } from "../../context";
import { USER_SESSION_KEY } from "../../constants";
import { RequiredModal } from "./components";

export const UnconfirmedTrips = () => {
  const { loading, hideLoader, showLoader } = useLoader();
  const [uncofirmedError, setUncofirmedError] = useState(null);
  const [unconfirmedTrips, setUnconfirmedTrips] = useState([]);
  const { unconfirmedTrips: unconfirmedTripIDs } = useContext(UnconfirmedContext);
  const { authModalView } = useContext(AuthModalContext);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { isDriver } = useSelector(selectUser);

  useEffect(() => {
    let timeOutID;
    if (unconfirmedTripIDs.length === 0)
      return setUncofirmedError({ code: 404, error: "У вас нет не подтверждённых поездок! :)" });
    else setUncofirmedError(null);
    showLoader();
    getTripsByIDs(unconfirmedTripIDs).then((res) => {
      hideLoader();
      if (res?.error) {
        if (res.error === "jwt expired") {
          sessionStorage.removeItem(USER_SESSION_KEY);
          dispatch(logoutUserFromStore());
          if (timeOutID) clearTimeout(timeOutID);
          timeOutID = setTimeout(() => {
            navigate("/login");
            authModalView();
          }, 3000);
        } else setUncofirmedError(res);
        return;
      }
      setUnconfirmedTrips(res.body);
    });
  }, [unconfirmedTripIDs]);

  return (
    <div className="d-flex flex-column gap-3 w-100 h-100">
      {loading && <Loader />}
      <div className="notConfirmedTrips card">
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
      <RequiredModal isDisabled={!!unconfirmedTripIDs?.length} />
    </div>
  );
};
