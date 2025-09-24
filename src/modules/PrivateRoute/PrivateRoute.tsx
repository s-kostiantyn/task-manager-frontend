import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

interface PrivateRouteProps {
  allowedRoles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const { user } = useAuthStore.getState();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
