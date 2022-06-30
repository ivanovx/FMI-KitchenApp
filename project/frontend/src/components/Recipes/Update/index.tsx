import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { FormikProvider, FieldArray, useFormik } from "formik";
import { TextField, Button, Container } from "@mui/material";
import RequireAuth from "../../Auth/RequireAuth";
import { useAuth } from "../../../modules/authContext";

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { IRecipe } from "../../../types/IRecipe";


export default function UpdateRecipe() {
    const { id } = useParams();

    return (
        <RequireAuth>
            <Container maxWidth="md" sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
                <RecipeForm id={id} />
            </Container>
        </RequireAuth>
    );
}

function RecipeForm({ id }: any) {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [recipe, setRecipe] = React.useState<IRecipe>({
        title: "",
        description: "",
        cookingTime: 0,
        tags: "",
        level: "",
        ingredients: [],
        steps: [],
    });

    React.useEffect(() => {
        axios
            .get(`http://localhost:5000/recipes/${id}`)
            .then(res => {
                console.log(res);
                setRecipe(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const formik = useFormik({
        initialValues: {
            title: recipe.title,
            description: recipe.description,
            cookingTime: recipe.cookingTime,
            tags: Array.from(recipe.tags).join(","),
            level: recipe.level,
            ingredients: Array.from(recipe.ingredients),
            steps: Array.from(recipe.steps),
        },
        onSubmit: (values: any) => {
            const headers = {
                "Authorization": `Bearer ${user.token}`
            };

            axios
                .post(`http://localhost:5000/recipes/${id}`, values, { headers })
                .then(res => {
                    console.log(res);
                    navigate("/");
                })
                .catch(err => console.log(err));
        },
        enableReinitialize: true,
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
                    name="cookingTime"
                    label="Time"
                    type="number"
                    value={formik.values.cookingTime}
                    onChange={formik.handleChange}
                    error={formik.touched.cookingTime && Boolean(formik.errors.cookingTime)}
                    helperText={formik.touched.cookingTime && formik.errors.cookingTime}
                />

                <TextField
                    fullWidth
                    name="tags"
                    label="Tags"
                    value={formik.values.tags}
                    onChange={formik.handleChange}
                    error={formik.touched.tags && Boolean(formik.errors.tags)}
                    helperText={formik.touched.tags && formik.errors.tags}
                />
                <Select
                    fullWidth
                    name="level"
                    label="Level"
                    value={formik.values.level}
                    onChange={formik.handleChange}
                    error={formik.touched.level && Boolean(formik.errors.level)}
                >
                    <MenuItem value="begginer">Begginer</MenuItem>
                    <MenuItem value="Advanced">Advanced</MenuItem>
                    <MenuItem value="intermediate">Intermediate</MenuItem>
                    <MenuItem value="profesional">Profesional</MenuItem>
                </Select>
                <FieldArray name="ingredients">
                    {({ push, remove }) => (
                        <>
                            {formik.values.ingredients.length > 0 && formik.values.ingredients.map((ingredient: any, index: number) => (
                                <div key={index}>
                                    <TextField
                                        label="Name"
                                        name={`ingredients.${index}.name`}
                                        value={ingredient.name}
                                        onChange={formik.handleChange}
                                    />
                                    <TextField
                                        label="Quantity"
                                        name={`ingredients.${index}.quantity`}
                                        value={ingredient.quantity}
                                        onChange={formik.handleChange}
                                    />
                                    <Button onClick={() => remove(index)}>X</Button>
                                </div>
                            ))}
                            <Button onClick={() => push({ name: "", quantity: "" })}>Add Ingredient</Button>
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
                                    <Button onClick={() => remove(index)}>X</Button>
                                </div>
                            ))}
                            <Button onClick={() => push({ description: '' })}>Add Step</Button>
                        </>
                    )}
                </FieldArray>
                <Button type="submit">Update</Button>
            </form>
        </FormikProvider>
    );
}