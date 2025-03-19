import { Route, Routes } from "react-router";
import { Main, UnconfirmedTrips, NewTrip, Trips, AboutUs, TripPage } from "../pages";
import { FullScreenContainer } from "../core/UI";
import { Comments } from "../components/Comments/Comments";

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
    <Route
      path="/trips/unconfirmed"
      element={
        <FullScreenContainer>
          <UnconfirmedTrips />
        </FullScreenContainer>
      }
    />
    <Route path="/trips" element={<Trips />} />
    <Route
      path="/trips/:id"
      element={
        <FullScreenContainer>
          <TripPage />
        </FullScreenContainer>
      }
    />
    <Route path="/aboutUs" element={<AboutUs />} />
    <Route path="/test" element={<Comments/>}/>
  </Routes>
);
