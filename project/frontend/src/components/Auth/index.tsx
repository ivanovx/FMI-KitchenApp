import React, { useState } from "react";
import { AuthContext } from "../../modules/authContext";

type AuthProviderProps = {
    children: React.ReactNode;
}

export default function AuthProvider({ children } : AuthProviderProps) {
    const [user, setUser] = useState<any>({});

    const signUp = (newUser : any) => {       
        setUser(newUser);
    };

    const signIn = (newUser : any) => {
        setUser(newUser);
    };

    const signOut = () => { 
        setUser(null);
    };

    return <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>{children}</AuthContext.Provider>;
}