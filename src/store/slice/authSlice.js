import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  id: null,
  login: null,
  email: null,
  role: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialUserState,
  reducers: {
    setUser: (state, { payload }) => ({ ...state, ...payload }),
    logoutUserFromStore: () => initialUserState,
  },
  extraReducers: () => {},
});

export const { reducer: userReducer } = authSlice;

export const { setUser, logoutUserFromStore } = authSlice.actions;
