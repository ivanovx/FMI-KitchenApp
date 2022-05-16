import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from ".";

export default function RequireAuth({ children }) {
    let auth = useAuth();
    let location = useLocation();

    if (!auth.user) {
        return <Navigate to="/signin" state={{ from: location }} />;
    }

    return children;
}