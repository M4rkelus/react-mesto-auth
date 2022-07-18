import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = ({ isLoggedIn }) => {
  return isLoggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default ProtectedRoutes;
