import { createSlice } from "@reduxjs/toolkit";
import { TRIP_STATUSES } from "../../constants";

const initialTripState = {
  fromWhere: null,
  toWhere: null,
  totalPrice: 0,
  passengersNumber: 1,
  status: TRIP_STATUSES.NEW.text,
  creator: {
    userName: null,
    price: "-",
  },
  driver: {
    userName: "Пока не найден",
    price: "-",
  },
  comments: [],
};

const tripSlice = createSlice({
  name: "trip",
  initialState: initialTripState,
  reducers: {
    redGetTrip: (state, { payload }) => ({ ...payload }),
    redConfirmDriver: (state, { payload }) => ({ ...state, status: TRIP_STATUSES.READY.text, totalPrice: payload }),
    redLooseDriver: (state) => ({ ...state, status: TRIP_STATUSES.NEW.text, totalPrice: 0, driver: null }),
    redCancelTrip: (state) => ({ ...state, status: TRIP_STATUSES.CANCEL.text }),
    redDeleteTrip: () => initialTripState,
    redAddComment: (state, { payload }) => ({ ...state, comments: [payload, ...state.comments] }),
  },
  extraReducers: () => {},
});

export const { reducer: tripReducer } = tripSlice;

export const { redGetTrip, redConfirmDriver, redLooseDriver, redCancelTrip, redDeleteTrip, redAddComment } =
  tripSlice.actions;
