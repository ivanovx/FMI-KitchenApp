import React from "react";
import axios from "axios";
import { Grid, TextField } from "@mui/material";

import { IRecipe } from "../../../types/IRecipe";

import { Recipe } from "..";

export default function SearchRecipe() {
    const [recipes, setRecipes] = React.useState<IRecipe[]>([]);

    React.useEffect(() => {
        axios
            .get("http://localhost:5000/recipes")
            .then(res => {
                setRecipes(res.data);
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleSearchInput = (event: any) => {
        event.preventDefault();

        setRecipes(recipes => recipes.filter(r => r.title.includes(event.target.value)));

        console.log(recipes);
    };

    return (
        <>
            <TextField label="Search" variant="outlined" onChange={handleSearchInput} />
            <Grid container spacing={2}>
                {recipes.map((recipe: any, index: number) => {
                    return (
                        <Grid item xs={4} sx={{ marginTop: "3rem", marginBottom: "3rem" }} key={index}>
                            <Recipe recipe={recipe} />
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};