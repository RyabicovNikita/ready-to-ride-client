import { configureStore } from "@reduxjs/toolkit";
import { tripReducer, tripsReducer, userReducer } from "./slice";

const rootReducer = {
  user: userReducer,
  trip: tripReducer,
  trips: tripsReducer,
};

const createStore = () => {
  const store = configureStore({ reducer: rootReducer });
  return store;
};

export const store = createStore();
