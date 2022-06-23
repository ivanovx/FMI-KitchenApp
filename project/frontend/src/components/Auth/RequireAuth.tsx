import { Navigate } from "react-router-dom";

import { useAuth } from "../../modules/authContext";

export default function RequireAuth({ children }: any) {
    const auth = useAuth();

    if (!auth.user) {
        return <Navigate to="/auth/signin" />;
    }

    return children;
}