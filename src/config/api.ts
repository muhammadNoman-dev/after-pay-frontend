// import { authService } from "services/index"
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import env from "./env";
import { authService } from "../services";

axios.defaults.baseURL = env.apiRoot;
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    console.warn("response: ", response);
    if (response.data.warningMessage) {
      toast(response.data.warningMessage, {
        position: "top-right",
        autoClose: 10000,
        style: { backgroundColor: "#F08F06", color: "white" },
      });
    }
    if (response.data.successMessage) {
      toast.success(` ${response.data.successMessage}`);
    }
    return response;
  },
  (error: AxiosError) => {
    console.error(error.status);
    const { response: { status, data: { message } } = error.message } =
      error as any;
    if (status === 401) {
      authService.logout();
      return window.location.reload();
    }
    Array.isArray(message)
      ? message.forEach((item: any) => toast.error(item))
      : toast.error(message);
    return Promise.reject(error);
  }
);

export const setAuthToken = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
