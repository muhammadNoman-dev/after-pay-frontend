import axios from "axios";
import {
  GetProfileResponseInterface,
  LoginInterface,
  LoginResponseInterface,
} from "../types/auth.types";

const ROOT_PATH = "auth";

export default class AuthService {
  static login = (credentials: LoginInterface) =>
    axios.post<LoginResponseInterface>(`${ROOT_PATH}/login`, credentials);

  static getProfile = () =>
    axios.get<GetProfileResponseInterface>(`${ROOT_PATH}/profile`);

  static setAuthToken = (token: string) => localStorage.setItem("token", token);
  static getAuthToken = (): string => localStorage.getItem("token") || "";

  //   static setUserRememberMe = (token: string) =>
  //     localStorage.setItem("rememberMe", token);
  //   static getUserRememberMe = (): string =>
  //     localStorage.getItem("rememberMe") || "";

  static setUserTimeout = (time: string) =>
    localStorage.setItem("timeout", time);
  static getUserTimeout = (): string => localStorage.getItem("timeout") || "";

  static logout = () => localStorage.clear();
}
