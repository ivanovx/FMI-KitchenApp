import React from "react";
import { useFormik } from "formik";
import { Button, TextField } from "@material-ui/core";

import { useRecipes } from ".";
import { RequireAuth } from "../Auth";
import { CreateRecipeSchema } from "../../schemas";

export default function CreateRecipe() {
    const recipes = useRecipes();

    const formik = useFormik({
        initialValues: {
            name: "",
            shortDescription: "",
            timeToCooking: "",
            products: "Products seperate by coma",
            result: "",
            description: "",
        },
        validationSchema: CreateRecipeSchema,
        onSubmit: values => recipes.create(values),
    });

    return (
        <RequireAuth>
            <h1>Create Recipe</h1>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Recipe Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                    fullWidth
                    id="shortDescription"
                    name="shortDescription"
                    label="Recipe short description"
                    value={formik.values.shortDescription}
                    onChange={formik.handleChange}
                    error={formik.touched.shortDescription && Boolean(formik.errors.shortDescription)}
                    helperText={formik.touched.shortDescription && formik.errors.shortDescription}
                />
                <TextField
                    fullWidth
                    id="timeToCooking"
                    name="timeToCooking"
                    label="Time to cooking"
                    type="number"
                    value={formik.values.timeToCooking}
                    onChange={formik.handleChange}
                    error={formik.touched.timeToCooking && Boolean(formik.errors.timeToCooking)}
                    helperText={formik.touched.timeToCooking && formik.errors.timeToCooking}
                />
                <TextField
                    fullWidth
                    id="products"
                    name="products"
                    label="Needed Products"
                    value={formik.values.products}
                    onChange={formik.handleChange}
                    error={formik.touched.products && Boolean(formik.errors.products)}
                    helperText={formik.touched.products && formik.errors.products}
                />
                <TextField
                    fullWidth
                    id="result"
                    name="result"
                    label="Result"
                    type="url"
                    value={formik.values.result}
                    onChange={formik.handleChange}
                    error={formik.touched.result && Boolean(formik.errors.result)}
                    helperText={formik.touched.result && formik.errors.result}
                />
                <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                />
                <Button color="primary" variant="contained" fullWidth type="submit">Create Recipe</Button>
            </form>
        </RequireAuth>
    );
}