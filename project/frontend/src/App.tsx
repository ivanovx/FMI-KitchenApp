import React from "react";
import { Routes, Route } from "react-router-dom";

import AuthProvider, { SignIn, SignUp } from "./components/Auth";

import Layout from "./components/Layout";
import Recipes from "./components/Recipes";
import Dashboard from "./components/Dashboard";
import Recipe from "./components/Recipes/Recipe";
import CreateRecipe from "./components/Recipes/Create";
import UpdateRecipe from "./components/Recipes/Update";
import SearchRecipe from "./components/Recipes/Search";

import Users from "./components/Users";

export default function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Recipes />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/recipes/:id" element={<Recipe />} />
                    <Route path="/recipes/search" element={<SearchRecipe />} />
                    <Route path="/recipes/create" element={<CreateRecipe />} />
                    <Route path="/recipes/update/:id" element={<UpdateRecipe />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/auth/signin" element={<SignIn />} />
                    <Route path="/auth/signup" element={<SignUp />} />
                </Route>
            </Routes>
        </AuthProvider>
    );
}