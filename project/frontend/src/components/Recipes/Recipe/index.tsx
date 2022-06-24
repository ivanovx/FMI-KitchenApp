import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Recipe() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState<any>({});

    useEffect(() => {
        axios
            .get(`http://localhost:5000/recipes/${id}`)
            .then(res => {
                console.log(res);
                setRecipe(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <article>
            <h1>{recipe.title}</h1>
        </article>
    )
}