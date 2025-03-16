import { Route, Routes } from "react-router";
import { Main, UnconfirmedTrips, NewTrip, Trip, Trips, AboutUs, EditTrip } from "../pages";
import { FullScreenContainer } from "../core/UI";

export const RoutesContainer = ({
  authModalHide,
  authModalView,
  priceModalState,
  setPriceModalState,
  tripEdit,
  setTripEdit,
}) => (
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
      path="/trips"
      element={
        <Trips
          authModalHide={authModalHide}
          authModalView={authModalView}
          priceModalState={priceModalState}
          setPriceModalState={setPriceModalState}
        />
      }
    />
    <Route
      path="/trips/unconfirmed"
      element={
        <FullScreenContainer>
          <UnconfirmedTrips authModalHide={authModalHide} authModalView={authModalView} />
        </FullScreenContainer>
      }
    />

    <Route path="/aboutUs" element={<AboutUs />} />
    <Route
      path="/trips/:id"
      element={
        <FullScreenContainer>
          {tripEdit ? (
            <EditTrip
              authModalHide={authModalHide}
              authModalView={authModalView}
              priceModalState={priceModalState}
              setPriceModalState={setPriceModalState}
              setTripEdit={setTripEdit}
            />
          ) : (
            <Trip
              priceModalState={priceModalState}
              setPriceModalState={setPriceModalState}
              authModalView={authModalView}
              setTripEdit={setTripEdit}
            />
          )}
        </FullScreenContainer>
      }
    />
  </Routes>
);
