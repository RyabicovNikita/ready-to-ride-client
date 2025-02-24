import { Route, Routes } from "react-router";
import { Main, NewTrip } from "../pages";
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
      path="/trip"
      element={
        <FullScreenContainer>
          <NewTrip />
        </FullScreenContainer>
      }
    />
  </Routes>
);
