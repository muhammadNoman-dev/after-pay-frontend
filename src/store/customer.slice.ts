import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppThunk, RootState } from ".";

import { customerService } from "../services";

import { GetCustomer, SubmitCustomer } from "../types/customer.types";
import { updateState } from "../config/utils";

export interface CustomerStateInterface {
  list: GetCustomer[];
  loading: boolean;
  saving: boolean;
}

const initialState: CustomerStateInterface = {
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
    customerSaved: (customer, action: PayloadAction<GetCustomer>) => {
      customer.saving = false;
      const [UpdatedValue] = updateState(customer.list, action.payload, "_id");
      customer.list = UpdatedValue;
    },
    fetchingCustomers: (customer) => {
      customer.loading = true;
    },
    customersFetched: (customer, action: PayloadAction<GetCustomer[]>) => {
      customer.loading = false;
      customer.list = action.payload;
    },
    customersFetchingFailed: (customer) => {
      customer.loading = false;
    },
    deleteCustomer: (customer, action: PayloadAction<string>) => {
      const customerIndex = customer.list.findIndex(
        (list) => list._id === action.payload
      );
      customer.list.splice(customerIndex, 1);
    },
  },
});

//REDUCER
export default customerSlice.reducer;

//ACTIONS
export const {
  savingCustomer,
  savingCustomerFailed,
  customerSaved,
  customersFetched,
  customersFetchingFailed,
  fetchingCustomers,
  deleteCustomer,
} = customerSlice.actions;

const submitCustomer =
  (customerData: SubmitCustomer, cb?: () => void): AppThunk =>
  async (dispatch) => {
    let data = null;
    try {
      dispatch(savingCustomer());
      if (customerData._id) {
        data = await customerService.updateCustomer(
          customerData._id,
          customerData
        );
      } else {
        data = await customerService.submitCustomer(
          customerData as SubmitCustomer
        );
      }
      const { data: customerResponse } = data;
      cb && cb();
      dispatch(customerSaved(customerResponse));
    } catch (error) {
      dispatch(savingCustomerFailed());
    }
  };

const getCustomers = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchingCustomers());
    const { data: customerResponse } = await customerService.getAllCustomers();
    dispatch(customersFetched(customerResponse));
  } catch (error) {
    dispatch(customersFetchingFailed());
  }
};

const deleteCustomerById =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      await customerService.deleteCustomer(id);
      dispatch(deleteCustomer(id));
    } catch (error) {
      dispatch(savingCustomerFailed());
    }
  };

export { submitCustomer, getCustomers, deleteCustomerById };

//SELECTORS
const selectCustomerState = (state: RootState) => state.customer;

const allCustomers = () => (state: RootState) =>
  selectCustomerState(state).list;

const isCustomerLoading = () => (state: RootState) =>
  selectCustomerState(state).loading;

const isCustomerSaving = () => (state: RootState) =>
  selectCustomerState(state).saving;

export { isCustomerLoading, allCustomers, isCustomerSaving };
