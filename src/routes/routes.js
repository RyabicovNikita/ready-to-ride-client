import { Route, Routes } from "react-router";
import { Main, NewTrip, Trips } from "../pages";
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
      path="/trips"
      element={
        <FullScreenContainer>
          <Trips />
        </FullScreenContainer>
      }
    />
  </Routes>
);
