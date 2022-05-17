import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import storage, { USERS_KEY, CURRENT_USER_KEY } from "../../storage";

import SignUp from "./SignUp";
import SignIn from "./SignIn";
import RequireAuth from "./RequireAuth";

const AuthContext = React.createContext(null);
const useAuth = () => React.useContext(AuthContext);

export default function AuthProvider({ children }) {
    const navigate = useNavigate();

    const initialUsers = storage.get(USERS_KEY, []);
    const curentUser = storage.get(CURRENT_USER_KEY, null);
    
    const [user, setUser] = useState(curentUser);
    const [users, setUsers] = useState(initialUsers);

    useEffect(() => storage.set(CURRENT_USER_KEY, user), [user]);
    useEffect(() => storage.set(USERS_KEY, users), [users]);

    const signUp = newUser => {
        const createdUser = {
            id: Math.random().toString(16).slice(2),
            createdOn: new Date(),
            updatedOn: new Date(),
            ...newUser,
        };
        
        setUser(createdUser);
        setUsers(oldUsers => [...oldUsers, createdUser]);

        navigate("/", { replace: true });
    };

    const signIn = newUser => {
        setUser(users.find(u => u.username === newUser.username /* and password */) || null);

        navigate("/", { replace: true });
    };

    const signOut = () => { 
        setUser(null);
        
        navigate("/");
    };

    return <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>{children}</AuthContext.Provider>;
}

export {
    SignIn,
    SignUp,
    useAuth,
    AuthContext,
    RequireAuth,
}