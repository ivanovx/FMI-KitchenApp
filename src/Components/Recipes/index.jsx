import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../Auth";
import MyRecipes from "./MyRecipes";
import AllRecipes from "./AllRecipes";
import CreateRecipe from "./CreateRecipe";

import storage, { RECIPES_KEY } from "../../storage";

const RecipesContext = React.createContext(null);
const useRecipes = () => React.useContext(RecipesContext);

export default function RecipesProvider({ children }) {
    const auth = useAuth();
    const navigate = useNavigate();

    const initialRecipes = storage.get(RECIPES_KEY, []);
    const [recipes, setRecipes] = useState(initialRecipes);

    useEffect(() => storage.set(RECIPES_KEY, recipes), [recipes]);

    const allRecipes = () => recipes;

    const createRecipe = newRecipe => {
        setRecipes(oldRecipes => [...oldRecipes, {
            id: Math.random().toString(16).slice(2),
            createdOn: new Date(),
            updatedOn: new Date(),
            userId: auth.user.id,
            ...newRecipe
        }]);

        navigate("/");
    };

    const updatedRecipe = updatedRecipe => {
        setRecipes(oldRecipes => [...oldRecipes, updatedRecipe]);

        navigate("/");
    };

    return <RecipesContext.Provider value={{ allRecipes, createRecipe, updatedRecipe }}>{children}</RecipesContext.Provider>
}

export { useRecipes, MyRecipes, AllRecipes, CreateRecipe }