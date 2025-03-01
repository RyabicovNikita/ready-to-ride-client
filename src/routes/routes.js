import { Route, Routes } from "react-router";
import { Main, MyTrips, NewTrip, Trips } from "../pages";
import { FullScreenContainer } from "../core/UI";

export const RoutesContainer = () => (
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
      path="/myTrips"
      element={
        <FullScreenContainer>
          <MyTrips onlyUserTrips={true} />
        </FullScreenContainer>
      }
    />
  </Routes>
);
