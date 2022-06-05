import React from "react";
import { Link } from "react-router-dom";
import { useRecipes } from ".";

export default function AllRecipes() {
    const recipes = useRecipes();

    return (
        <div className="AllRecipes">
            <h1>All recipes</h1>
            {recipes.recipes.map(recipe => (
                <li key={recipe.name}>
                   <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
                </li>
            ))}
        </div>
    );        
}