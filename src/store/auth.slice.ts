import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from ".";
import { authService } from "../services";
import { apiConfig } from "../config";
import {
  GetProfileResponseInterface,
  LoginInterface,
  LoginResponseInterface,
} from "../types/auth.types";

export interface AuthStateInterface {
  initialAuthDone: boolean;
  accessToken: string | null;
  user: null | GetProfileResponseInterface;
  loading: boolean;
}

const initialState: AuthStateInterface = {
  initialAuthDone: false,
  accessToken: "",
  user: null,
  loading: !!authService.getAuthToken(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggingIn: (state) => {
      state.loading = true;
    },
    loggedIn: (
      state,
      action: PayloadAction<
        LoginResponseInterface & GetProfileResponseInterface
      >
    ) => {
      const { token, ...rest } = action.payload;
      state.accessToken = token;
      state.user = rest;
      state.loading = false;
      state.initialAuthDone = true;
    },
    loggingInFailed: (state) => {
      state.loading = false;
    },
    clearAuthState: (state) => {
      state.initialAuthDone = false;
      state.accessToken = null;
      state.user = null;
      state.loading = false;
      state.initialAuthDone = false;
    },
  },
});

// REDUCER
export default authSlice.reducer;

// ACTIONS
const { loggedIn, loggingIn, loggingInFailed, clearAuthState } =
  authSlice.actions;

const establishAuth =
  (token: string): AppThunk =>
  async (dispatch) => {
    try {
      apiConfig.setAuthToken(token);
      authService.setAuthToken(token);
      const { data: profileResponse } = await authService.getProfile();
      dispatch(loggedIn({ token, ...profileResponse }));
    } catch {
      dispatch(loggingInFailed());
    }
  };

const login =
  (credentials: LoginInterface): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(loggingIn());
      const { data: loginResponse } = await authService.login(credentials);
      dispatch(establishAuth(loginResponse.token));
    } catch (error) {
      dispatch(loggingInFailed());
    }
  };

const logout =
  (cb: any): AppThunk =>
  async (dispatch) => {
    authService.logout();
    dispatch(clearAuthState());
    window.setTimeout(() => {
      cb();
    }, 200);
  };

export { login, logout };

// SELECTORS

const selectAuthState = (state: RootState) => state.auth;
const selectCurrentUser = () => (state: RootState) =>
  selectAuthState(state).user;
const selectAccessToken = () => (state: RootState) =>
  selectAuthState(state).accessToken;
const selectedAuthDone = () => (state: RootState) =>
  selectAuthState(state).initialAuthDone;

export { selectCurrentUser, selectAccessToken, selectedAuthDone };
