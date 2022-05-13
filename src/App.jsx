import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import User, { SignIn, SignUp } from "./components/User";

export default function App() {
    return (
        <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/user" element={<User />}>
                <Route path="signin" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
            </Route>
        </Routes>
    );
};