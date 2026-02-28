import { Navigate, Outlet } from "react-router";

interface ProtectedRouteProps {
  children?: React.ReactNode;
  isAllowed: boolean;
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  isAllowed,
  redirectTo = "/",
}: ProtectedRouteProps) {
  if (!isAllowed) return <Navigate to={redirectTo} />;
  return children || <Outlet />;
}
