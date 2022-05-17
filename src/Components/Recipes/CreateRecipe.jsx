import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import { useRecipes } from ".";
import { RequireAuth } from "../Auth";
import { CreateRecipeSchema } from "../../schemas";

export default function CreateRecipe() {
    const recipes = useRecipes();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {

        },
        validationSchema: CreateRecipeSchema,
        onSubmit: values => {
            recipes.createRecipe(values);

            navigate("/");
        }
    });

    return (
        <RequireAuth>
            <h1>Create Recipe</h1>
        </RequireAuth>
    );        
}