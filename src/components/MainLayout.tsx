import { useEffect } from "react";
import {
  Navigate as Navigation,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks";

import {
  logout,
  selectAccessToken,
  selectCurrentUser,
} from "../store/auth.slice";

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const isSignedIn = useAppSelector(selectAccessToken());

  const user = useAppSelector(selectCurrentUser());

  useEffect(() => {
    if (!user) {
      dispatch(
        logout(() => {
          navigate("auth/login");
        })
      );
    }
  }, [location.pathname, user]);

  if (!isSignedIn) return <Navigation to={"/auth/login"} />;

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
