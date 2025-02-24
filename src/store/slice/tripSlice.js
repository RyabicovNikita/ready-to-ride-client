import { createSlice } from "@reduxjs/toolkit";

const initialTripState = {
  fromWhere: null,
  toWhere: null,
  totalPrice: 0,
  userId: null,
  passengerPrice: 0,
  numberPeople: 1,
};

const tripSlice = createSlice({
  name: "trip",
  initialState: initialTripState,
  reducers: {
    createTrip: (state, { payload }) => ({ ...payload }),
  },
  extraReducers: () => {},
});

export const { reducer: tripReducer } = tripSlice;

export const { createTrip: addTripInStore } = tripSlice.actions;
