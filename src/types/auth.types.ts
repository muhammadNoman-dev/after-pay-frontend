export interface LoginInterface {
  email: string;
  password: string;
}

export interface LoginResponseInterface {
  token: string;
}

export interface GetProfileResponseInterface {
  _id: string;
  email: string;
}
