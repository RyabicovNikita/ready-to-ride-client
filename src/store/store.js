import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slice";

const rootReducer = {
  user: userReducer,
};

const createStore = () => {
  const store = configureStore({ reducer: rootReducer });
  return store;
};

export const store = createStore();
