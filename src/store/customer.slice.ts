import { createSlice } from "@reduxjs/toolkit";

import { AppThunk, RootState } from ".";

import { customerService } from "../services";

import { GetCustomer, SubmitCustomer } from "../types/customer.types";

export interface PostStateInterface {
  list: GetCustomer[];
  loading: boolean;
  saving: boolean;
}

const initialState: PostStateInterface = {
  list: [],
  loading: false,
  saving: false,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    savingCustomer: (customer) => {
      customer.saving = true;
    },
    savingCustomerFailed: (customer) => {
      customer.saving = false;
    },
    customerSaved: (customer) => {
      customer.saving = false;
    },
  },
});

//REDUCER
export default customerSlice.reducer;

//ACTIONS
export const { savingCustomer, savingCustomerFailed, customerSaved } =
  customerSlice.actions;

const submitCustomer =
  (customerData: SubmitCustomer, cb?: () => void): AppThunk =>
  async (dispatch) => {
    // let data = null;
    try {
      dispatch(savingCustomer());

      const data = await customerService.submitCustomer(
        customerData as SubmitCustomer
      );
      console.warn("data", data);
      dispatch(customerSaved());
      cb && cb();
    } catch (error) {
      dispatch(savingCustomerFailed());
    }
  };

export { submitCustomer };

//SELECTORS
const selectCustomerState = (state: RootState) => state.customer;

const posts = () => (state: RootState) => selectCustomerState(state).list;

const isPostLoading = () => (state: RootState) =>
  selectCustomerState(state).loading;

const isPostSaving = () => (state: RootState) =>
  selectCustomerState(state).saving;

export { isPostLoading, posts, isPostSaving };
