import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useRecipes } from ".";

import { RequireAuth, useAuth } from "../Auth";

export default function MyRecipes() {
    const { user } = useAuth();
    const { recipes, remove } = useRecipes();

    const myRecipes = recipes.filter(recipe => recipe.userId === user.id);

    return (
        <RequireAuth>
            <h1>My recipes</h1>
            {myRecipes.map(recipe => (
                <li key={recipe.id}>
                    <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
                    <Button onClick={() => remove(recipe.id)}>Delete</Button>
                </li>
            ))}
        </RequireAuth>
    );        
}