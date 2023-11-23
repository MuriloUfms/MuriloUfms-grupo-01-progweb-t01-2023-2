import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";

export function ProtectedRoute() {
  const [user, loading] = useAuthState(auth);
  const nav = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      nav("/");
    }
  }, [user, loading, nav]);

  return <Outlet />;
}
