import React from "react";

type IAuthContext = {
    user: any;
    error: any;
    signUp: (user: any) => void;
    signIn:  (user: any) => void;
    signOut: () => void;
}

export const AuthContext = React.createContext<IAuthContext>({
    user: null,
    error: null,
    signUp: () => {},
    signIn:  () => {},
    signOut: () => {},
});

export const useAuth = () => React.useContext(AuthContext);
