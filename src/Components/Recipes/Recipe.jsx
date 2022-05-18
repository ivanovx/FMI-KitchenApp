import React from "react";
import { useParams } from "react-router-dom";
import { useRecipes } from ".";

export default function Recipe() {
    const { id } = useParams();
    const { recipes } = useRecipes();

    const recipe = recipes.find(r => r.id === id);

    return (
        <div className="Recipe">
            <h1>{recipe.name}</h1>
            <time>{recipe.createdOn}</time>
            <img src={recipe.result} />
            <p>{recipe.shortDescription}</p>
            <p>Time to cooking: {recipe.timeToCooking} min</p>
            <ol>Needed products {recipe.products.split(",").map(product => <li key={product}>{product}</li>)}</ol>
            <p>{recipe.description}</p>
        </div>
    )
}