import React from "react";
import { Routes, Route } from "react-router-dom";

import AuthProvider, { SignIn, SignUp } from "./components/Auth";

import Home from "./components/Home";
import Layout from "./components/Layout";
import CreateRecipe from "./components/Recipes/Create";

export default function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/recipes/create" element={<CreateRecipe />} />
                    <Route path="/auth/signin" element={<SignIn />} />
                    <Route path="/auth/signup" element={<SignUp />} />
                </Route>
            </Routes>
        </AuthProvider>
    );
}