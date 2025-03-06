import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import customerReducer from "./customer.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  customer: customerReducer,
});

export default rootReducer;
