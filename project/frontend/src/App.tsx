import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";

import { Layout } from "./components/Layout";
import CreateRecipe from "./components/Recipes/Create";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/recipes/create" element={<CreateRecipe />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}