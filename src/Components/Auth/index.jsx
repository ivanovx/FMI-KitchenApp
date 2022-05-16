import React, { useState, useEffect } from "react";

import storage, { USERS_KEY, CURRENT_USER_KEY } from "../../storage";

export const AuthContext = React.createContext(null);

export const useAuth = () => React.useContext(AuthContext);

export default function AuthProvider({ children }) {
    const initialUsers = storage.get(USERS_KEY, []);
    const curentUser = storage.get(CURRENT_USER_KEY, null);
    
    const [user, setUser] = useState(curentUser);
    const [users, setUsers] = useState(initialUsers);

    useEffect(() => storage.set(CURRENT_USER_KEY, user), [user]);
    useEffect(() => storage.set(USERS_KEY, users), [users]);

    const signUp = newUser => {
        const createdUser = {
            id: Math.random().toString(16).slice(2),
            createdOn: Date.now(),
            updatedOn: Date.now(),
            ...newUser,
        };
        
        setUser(createdUser);
        setUsers(oldUsers => [...oldUsers, createdUser]);
    };

    const signIn = newUser => setUser(users.find(u => u.username === newUser.username /* and password */) || null);

    const signOut = () => setUser(null);

    const value = { user, signUp, signIn, signOut };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}