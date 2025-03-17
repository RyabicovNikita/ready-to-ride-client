import "./UnconfirmedTrips.scss";
import { useCallback, useContext, useEffect, useState } from "react";
import { Loader, TripCard } from "../../components";
import { getTripsByIDs } from "../../api";
import { useError, useLoader } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserFromStore, selectUser } from "../../store";
import { useNavigate } from "react-router";
import { AuthModalContext, UnconfirmedContext } from "../../context";
import { RequiredModal } from "./components";
import { renderError } from "../../utils";

export const UnconfirmedTrips = () => {
  const { loading, hideLoader, showLoader } = useLoader();
  const [uncofirmedError, setUncofirmedError] = useState(null);
  const [unconfirmedTrips, setUnconfirmedTrips] = useState([]);
  const { unconfirmedTrips: unconfirmedTripIDs } = useContext(UnconfirmedContext);
  const { authModalView } = useContext(AuthModalContext);
  const { error, resetError, handleError } = useError();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { isDriver } = useSelector(selectUser);

  const checkTokenExpired = useCallback(
    (error) => logoutUserFromStore({ error, handleError, dispatch, navigate, authModalView, resetError }),
    []
  );

  useEffect(() => {
    if (unconfirmedTripIDs.length === 0)
      return setUncofirmedError({ code: 404, error: "У вас нет не подтверждённых поездок! :)" });
    else setUncofirmedError(null);
    showLoader();
    getTripsByIDs(unconfirmedTripIDs).then((res) => {
      hideLoader();
      if (res.error) {
        if (!checkTokenExpired(res.error)) setUncofirmedError(res);
        return;
      }
      setUnconfirmedTrips(res.body);
    });
  }, [unconfirmedTripIDs]);

  return (
    <div className="d-flex flex-column gap-3 w-100 h-100">
      {loading && <Loader />}
      <div className="notConfirmedTrips card">
        {renderError(error)}
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
