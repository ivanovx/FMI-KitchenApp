import React from "react";
import { FormikProvider, FieldArray, useFormik } from "formik";
import { TextField, Button, Container, Grid } from "@mui/material";

function Form() {
    const formik = useFormik({
        initialValues: {
            title: "",
            result: "",
            description: "",
            cookingTime: "",
            difficulty: 1,
            products: [
                { name: "", amount: 0 }
            ],
            steps: [
                { description: "", result: "" }
            ],
        },
        onSubmit: (values: any) => {
            console.log(values);
        }
    });

    return (
        <Grid container spacing={2}>
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
                                        type="number"
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
                                        label="Description"
                                        multiline
                                        rows={3}
                                        name={`steps.${index}.description`}
                                        value={step.description}
                                        onChange={formik.handleChange}
                                    />
                                    <TextField
                                        label="Result"
                                        type="file"
                                        name={`products.${index}.result`}
                                        value={step.result}
                                        onChange={formik.handleChange}
                                    />
                                    <Button onClick={() => remove(index)}>X</Button>
                                </div>
                            ))}
                            <Button onClick={() => push({ name: '', amount: '' })}>Add Step</Button>
                        </>
                    )}
                </FieldArray>
                <Button type="submit">Create</Button>
            </form>
        </FormikProvider>
        </Grid>
    );
}

export default function CreateRecipe() {
    return (
        <Container maxWidth="md">
            <Form />
        </Container>
    );
}