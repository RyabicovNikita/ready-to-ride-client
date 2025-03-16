import { useState } from "react";
import { EditTrip, Trip } from "./components";

export const TripPage = () => {
  const [tripEdit, setTripEdit] = useState(false);

  return tripEdit ? <EditTrip setTripEdit={setTripEdit} /> : <Trip setTripEdit={setTripEdit} />;
};
