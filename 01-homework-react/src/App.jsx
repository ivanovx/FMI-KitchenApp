import React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./Components/Layout";
import AuthProvider, { SignIn, SignUp } from "./Components/Auth";
import RecipesProvider, { MyRecipes, AllRecipes, CreateRecipe, Recipe } from "./Components/Recipes";

export default function App() {
    return (
        <div className="App">
            <AuthProvider>
                <RecipesProvider>
                    <Routes>
                        <Route element={<Layout />}>
                            <Route index element={<AllRecipes />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/signin" element={<SignIn />} />
                            <Route path="/recipes" element={<MyRecipes />} />
                            <Route path="/recipes/:id" element={<Recipe />} />
                            <Route path="/create-recipe" element={<CreateRecipe />} />
                        </Route>
                    </Routes>
                </RecipesProvider>
            </AuthProvider>
        </div>
    );
}