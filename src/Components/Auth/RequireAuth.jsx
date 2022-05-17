import { Navigate } from "react-router-dom";

import { useAuth } from ".";

export default function RequireAuth({ children }) {
    const auth = useAuth();

    if (!auth.user) {
        return <Navigate to="/signin" />;
    }

    return children;
}