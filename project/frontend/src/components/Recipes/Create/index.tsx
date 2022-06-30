import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FormikProvider, FieldArray, useFormik } from "formik";
import { TextField, Button, Container } from "@mui/material";
import RequireAuth from "../../Auth/RequireAuth";
import { useAuth } from "../../../modules/authContext";

import { convertBase64 } from "../../../modules/images";

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { RecipeSchema } from "../../../modules/schemas";

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
    const navigate = useNavigate();

    const [result, setResult] = React.useState<string>("");

    const handleResultImageChange = async (event: any) => {
        const file = event.target.files[0];
        const resultImg: any = await convertBase64(file);

        setResult(resultImg);
    };

    const formik = useFormik({
        initialValues: {
            title: "",
            result: "",
            description: "",
            cookingTime: "",
            level: "",
            tags: "",
            ingredients: [],
            steps: [],
        },
        validationSchema: RecipeSchema,
        onSubmit: (values: any) => {
            const headers = {
                "Authorization": `Bearer ${user.token}`
            };
    
            const recipe = {
                ...values,
                result,
            };
    
            axios
                .post("http://localhost:5000/recipes/create", recipe, { headers })
                .then(res => {
                    console.log(res);
                    navigate("/");
                })
                .catch(err => console.log(err));
        }
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
                    onChange={handleResultImageChange}
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
                <Button type="submit">Create</Button>
            </form>
        </FormikProvider>
    );
}