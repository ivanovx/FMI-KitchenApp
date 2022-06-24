import React, { useState } from "react";
import axios from "axios";

import { FormikProvider, FieldArray, useFormik } from "formik";
import { TextField, Button, Container } from "@mui/material";
import RequireAuth from "../../Auth/RequireAuth";
import { useAuth } from "../../../modules/authContext";

import { convertBase64 } from "../../../modules/images";

export default function CreateRecipe() {
    return (
        <RequireAuth>
            <Container maxWidth="md" sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
                <RecipeForm />
            </Container>
        </RequireAuth>
    );
}

function RecipeForm() {
    const { user } = useAuth();

    const initialValues = {
        title: "",
        result: "",
        description: "",
        cookingTime: "",
        //difficulty: ,
        products: [],
        steps: [],
    };

    const onSubmit = async (values: any) => {
        const headers = {
            "Authorization": `Bearer ${user.token}`
        };

        console.log(values);

        //console.log(recipe)
       /* axios
            .post("http://localhost:5000/recipes/create", recipe, { headers })
            .then(res => console.log(res))
            .catch(err => console.log(err));*/
    };

    /*const handelResultImageChange = async (event: any) => {
        const file = event.target.files[0];
        const base64: any = await convertBase64(file);

        setResultImage(base64);
    };*/

    const formik = useFormik({
        initialValues,
        onSubmit,
    });

    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        name="title"
                        label="Title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                    />
                    <TextField
                        fullWidth
                        name="description"
                        label="Description"
                        multiline
                        rows={5}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    />
                    <TextField
                        fullWidth
                        name="result"
                        label="Result"
                        type="file"
                        value={formik.values.result}
                        onChange={formik.handleChange}
                        error={formik.touched.result && Boolean(formik.errors.result)}
                        helperText={formik.touched.result && formik.errors.result}
                    />
                    <TextField
                        fullWidth
                        name="cookingTime"
                        label="Time"
                        type="number"
                        value={formik.values.cookingTime}
                        onChange={formik.handleChange}
                        error={formik.touched.cookingTime && Boolean(formik.errors.cookingTime)}
                        helperText={formik.touched.cookingTime && formik.errors.cookingTime}
                    />
                    <FieldArray name="products">
                        {({ push, remove }) => (
                            <>
                                {formik.values.products.length > 0 && formik.values.products.map((product: any, index: number) => (
                                    <div key={index}>
                                        <TextField
                                            label="Name"
                                            name={`products.${index}.name`}
                                            value={product.name}
                                            onChange={formik.handleChange}
                                        />
                                        <TextField
                                            label="Amount"
                                            name={`products.${index}.amount`}
                                            value={product.amount}
                                            onChange={formik.handleChange}
                                        />
                                        <Button onClick={() => remove(index)}>X</Button>
                                    </div>
                                ))}
                                <Button onClick={() => push({ name: '', amount: '' })}>Add Product</Button>
                            </>
                        )}
                    </FieldArray>
                
                    <FieldArray name="steps">
                        {({ push, remove }) => (
                            <>
                                {formik.values.steps.length > 0 && formik.values.steps.map((step: any, index: number) => (
                                    <div key={index}>
                                        <TextField
                                            multiline
                                            rows={3}
                                            fullWidth
                                            label="Description"
                                            name={`steps.${index}.description`}
                                            value={step.description}
                                            onChange={formik.handleChange}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Result"
                                            type="file"
                                            name={`steps.${index}.result`}
                                            value={step.result}
                                            onChange={formik.handleChange}
                                        />
                                        <Button onClick={() => remove(index)}>X</Button>
                                    </div>
                                ))}
                                <Button onClick={() => push({ description: '', result: '' })}>Add Step</Button>
                            </>
                        )}
                    </FieldArray>
                <Button type="submit">Create</Button>
            </form>
        </FormikProvider>
    );
}