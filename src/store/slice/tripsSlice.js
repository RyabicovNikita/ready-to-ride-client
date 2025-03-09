import { createSlice } from "@reduxjs/toolkit";

const initialTripState = [];

const tripsSlice = createSlice({
  name: "trips",
  initialState: initialTripState,
  reducers: {
    addTripsInStore: (state, { payload }) => [...payload],
    clearTripsStore: () => initialTripState,
  },
  extraReducers: () => {},
});

export const { reducer: tripsReducer } = tripsSlice;

export const { addTripsInStore } = tripsSlice.actions;
