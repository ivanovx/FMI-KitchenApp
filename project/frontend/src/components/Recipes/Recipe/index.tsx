import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import { useAuth } from "../../../modules/authContext";

export default function Recipe() {
    const auth = useAuth();
    const { id } = useParams();
    const [recipe, setRecipe] = useState<any>({});
    const [comments, setComments] = useState<any>([]);

    const headers = {
        "Authorization": `Bearer ${auth.user.token}`
    };

    useEffect(() => {
        axios
            .get(`http://localhost:5000/recipes/${id}`)
            .then(res => {
                console.log(res);
                setRecipe(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/comments/${id}`)
            .then(res => {
                console.log(res);
                setComments(res.data);
            })
            .catch(err => console.log(err));
    }, [])

    const formik = useFormik({
        initialValues: {
            body: ""
        },
        onSubmit: (values) => {
            axios
                .post(`http://localhost:5000/comments/${id}`, values, { headers })
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.log(err));
        }
    });

    return (
        <>
            <article>
                <h1>{recipe.title}</h1>
            </article>
            <aside>TODO</aside>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <TextField 
                        multiline
                        fullWidth
                        rows={5}
                        name="body"
                        value={formik.values.body}
                        onChange={formik.handleChange}
                        error={formik.touched.body && Boolean(formik.errors.body)}
                        helperText={formik.touched.body && formik.errors.body}
                    />
                    <Button type="submit">Comment</Button>
                </form>
                {comments.map((comment: any, index: number) => (
                    <div key={index}>
                        {comment.body} - {comment.userId} - {comment.createdOn}
                    </div>
                ))}
            </div>
        </>
        
    )
}