import React, { createContext, useContext } from "react";

type IAuthContext = {
    user: any;
    signUp: (user: any) => void;
    signIn:  (user: any) => void;
    signOut: () => void;
}

export const AuthContext = createContext<IAuthContext>({
    user: null,
    signUp: () => {},
    signIn:  () => {},
    signOut: () => {},
});

export const useAuth = () => useContext(AuthContext);
