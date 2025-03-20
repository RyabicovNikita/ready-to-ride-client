import { useContext, useMemo, useState } from "react";
import { EditTrip, Trip } from "./components";
import { useNavigate, useParams } from "react-router";
import { AuthModalContext } from "../../context";
import { getTripPrePrice } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { TRIP_STATUSES } from "../../constants";
import { selectTrip } from "../../store";

export const TripPage = () => {
  const [tripEdit, setTripEdit] = useState(false);
  const trip = useSelector(selectTrip);
  const [headerColor, setHeaderColor] = useState("white");
  const { authModalView } = useContext(AuthModalContext);
  const prePrice = useMemo(() => getTripPrePrice(trip), [trip]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { id } = useParams();
  id = Number(id);

  const updateHeaderColor = () => {
    if (!trip.status) return;
    const status = Object.values(TRIP_STATUSES).find((status) => status.text === trip.status);

    setHeaderColor(status?.color ?? "white");
  };
  return tripEdit ? (
    <EditTrip
      headerColor={headerColor}
      setTripEdit={setTripEdit}
      trip={trip}
      id={id}
      authModalView={authModalView}
      prePrice={prePrice}
      navigate={navigate}
      dispatch={dispatch}
    />
  ) : (
    <Trip
      headerColor={headerColor}
      updateHeaderColor={updateHeaderColor}
      setTripEdit={setTripEdit}
      trip={trip}
      id={id}
      authModalView={authModalView}
      prePrice={prePrice}
      navigate={navigate}
      dispatch={dispatch}
    />
  );
};
