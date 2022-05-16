import React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./Components/Layout";
import AuthProvider from "./Components/Auth";

import RequireAuth from "./Components/Auth/RequireAuth";

import SignUp from "./Components/Auth/SignUp";
import SignIn from "./Components/Auth/SignIn";

export default function App() {
    return (
        <div className="App">
            <AuthProvider>
                <Routes>
                    <Route element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route
                            path="/protected"
                            element={
                                <RequireAuth>
                                    <ProtectedPage />
                                </RequireAuth>
                            }
                        />
                    </Route>
                </Routes>
            </AuthProvider>
        </div>
    );
}

function Home() {
    return <h3>Home</h3>;
}

function ProtectedPage() {
    return <h3>Protected</h3>;
}
