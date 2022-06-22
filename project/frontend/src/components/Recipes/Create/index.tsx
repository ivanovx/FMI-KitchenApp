import React, { useId } from "react";
import { useFormik, Formik, Form, Field, FieldArray } from "formik";
import { TextField, Button, Select, MenuItem, InputLabel } from "@mui/material";

/*
  <FieldArray
                        name="steps"
                        render={arrayHelpers => (
                            <div>
                                {props.values.steps && props.values.steps.length > 0 ? (
                                    props.values.steps.map((step: any, index: number) => (
                                        <div key={index}>
                                            <Field type="text" name={`steps.${index}.description`} placeholder="Description" />
                                            <Field type="file" name={`steps.${index}.image`} placeholder="Result" />
                                            <button
                                                type="button"
                                                onClick={() => arrayHelpers.remove(index)}
                                            >
                                                -
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => arrayHelpers.insert(index, '')}
                                            >
                                                +
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <button type="button" onClick={() => arrayHelpers.push('')}>
                                        Add step
                                    </button>
                                )}
                            </div>
                        )}
                    />

*/

export default function CreateRecipe() {
    const initialValues = {
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
    };

    const onSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <div>
            <h1>Create Recipe</h1>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {props => (
                    <Form>
                        <Field type="text" name="title" placeholder="Recipe Title" />
                        <Field type="text" name="description" placeholder="Recipe Description" />
                        <Field type="number" name="cookingTime" placeholder="Time to cooking" />
                        <Field type="file" name="result" placeholder="Result" />
                        <FieldArray name="products">
                            {({ push, remove }) => (
                                <>
                                    {props.values.products.length > 0 && props.values.products.map((product: any, index: number) => (
                                        <div key={index}>
                                            <Field type="text" name={`products.${index}.name`} />
                                            <Field type="number" name={`products.${index}.amount`} />

                                            <button type="button" onClick={() => remove(index)}>X</button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => push({ name: '', amount: '' })}>
                                        Add Product
                                    </button>
                                </>
                            )}
                        </FieldArray>

                        <FieldArray name="steps">
                            {({ push, remove }) => (
                                <>
                                    {props.values.steps.length > 0 && props.values.steps.map((step: any, index: number) => (
                                        <div key={index}>
                                            <Field type="text" name={`steps.${index}.description`} />
                                            <Field type="file" name={`steps.${index}.result`} />

                                            <button type="button" onClick={() => remove(index)}>X</button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => push({ description: '', result: '' })}>
                                        Add Step
                                    </button>
                                </>
                            )}
                        </FieldArray>

                        <Field as="select" name="difficulty">
                            <option value="1">Fast</option>
                            <option value="2">Easy</option>
                            <option value="3">Hard</option>
                        </Field>
                        <Button type="submit">Create</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}