import { Navigate } from "react-router-dom";

import { useAuth } from "../../modules/authContext";

export default function RequireAuth({ children }: any) {
    const auth = useAuth();

    return auth.user ? children : <Navigate to="/auth/signin" />;
}