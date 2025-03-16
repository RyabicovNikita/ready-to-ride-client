import { Route, Routes } from "react-router";
import { Main, UnconfirmedTrips, NewTrip, Trip, Trips, AboutUs, EditTrip } from "../pages";
import { FullScreenContainer } from "../core/UI";

export const RoutesContainer = ({ tripEdit, setTripEdit }) => (
  <Routes>
    <Route
      path="/"
      element={
        <FullScreenContainer>
          <Main />
        </FullScreenContainer>
      }
    />

    <Route
      path="/trips/new"
      element={
        <FullScreenContainer>
          <NewTrip />
        </FullScreenContainer>
      }
    />

    <Route path="/trips" element={<Trips />} />
    <Route
      path="/trips/unconfirmed"
      element={
        <FullScreenContainer>
          <UnconfirmedTrips />
        </FullScreenContainer>
      }
    />

    <Route path="/aboutUs" element={<AboutUs />} />
    <Route
      path="/trips/:id"
      element={
        <FullScreenContainer>
          {tripEdit ? <EditTrip setTripEdit={setTripEdit} /> : <Trip setTripEdit={setTripEdit} />}
        </FullScreenContainer>
      }
    />
  </Routes>
);
