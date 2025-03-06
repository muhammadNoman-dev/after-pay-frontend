import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { selectAccessToken } from "../store/auth.slice";
// import { selectSignedIn } from "../store/auth.slice";

const AuthLayout: React.FC = () => {
  const signedIn = useAppSelector(selectAccessToken());

  //   const user = useAppSelector(selectCurrentUser());

  if (signedIn) return <Navigate to={"/customerForm"} />;

  return <Outlet />;
};

export default AuthLayout;
