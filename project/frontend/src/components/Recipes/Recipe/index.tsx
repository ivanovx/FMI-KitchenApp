import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";

import { 
    Grid,
    Card,
    Button,
    List, 
    ListItem, 
    ListItemText,
    TextField, 
    Typography, 
    CardContent,
} from "@mui/material";

import { useAuth } from "../../../modules/authContext";
import { CommentSchema } from "../../../modules/schemas";

import styles from "./recipe.module.css";

export default function Recipe() {
    const auth = useAuth();
    const { id } = useParams();
    const [recipe, setRecipe] = React.useState<any>({});
    const [comments, setComments] = React.useState<any[]>([]);

    React.useEffect(() => {
        axios
            .get(`http://localhost:5000/recipes/${id}`)
            .then(res => {
                console.log(res);
                setRecipe(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    React.useEffect(() => {
        axios
            .get(`http://localhost:5000/comments/${id}`)
            .then(res => {
                console.log(res);
                setComments(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const formik = useFormik({
        initialValues: {
            body: ""
        },
        validationSchema: CommentSchema,
        onSubmit: (values) => {
            const headers = {
                "Authorization": `Bearer ${auth.user.token}`
            };

            axios
                .post(`http://localhost:5000/comments/${recipe._id}`, values, { headers })
                .then(res => {
                    console.log(res);
                    formik.resetForm();
                    axios
                        .get(`http://localhost:5000/comments/${id}`)
                        .then(res => {
                            console.log(res);
                            setComments(res.data);
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        }
    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <img className={styles.recipeImg} src={recipe.result} alt={recipe.title} />
                <h1>{recipe.title}</h1>
                <div>Recipe by {recipe._user && recipe._user.username}, createdOn {recipe.createdOn}</div>
                <p>{recipe.description}</p>
                {recipe.steps && recipe.steps.map((step: any, index: number) => (
                    <Card sx={{ marginTop: "1rem", marginBottom: "1rem" }} key={index}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Step {index + 1}
                            </Typography>
                            <Typography variant="body2">
                                {step.description}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Grid>

            <Grid item xs={4}>
                <h2>Ingredients</h2>
                <List dense>
                    {recipe.ingredients && recipe.ingredients.map((ingredient: any) => (
                        <ListItem key={ingredient.name}>
                            <ListItemText
                                primary={ingredient.name}
                                secondary={ingredient.quantity}
                            />
                        </ListItem>
                    ))}
                </List>

                <h2>Tags</h2>
                <List dense>
                    {recipe.tags && recipe.tags.map((tag: string) => (
                        <ListItem key={tag}>
                            <ListItemText primary={tag} />
                        </ListItem>
                    ))}
                </List>

                <h2>Comments</h2>
                <List dense>
                    {comments.map((comment: any) => (
                        <ListItem key={comment._id}>
                            <ListItemText
                                primary={comment.body}
                                secondary={`by ${comment._user.username} on ${comment.createdOn}`}
                            />
                        </ListItem>
                    ))}
                </List>
                
                <div>
                    {auth.user && <form onSubmit={formik.handleSubmit}>
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
                    </form>}
                </div>
            </Grid>
        </Grid>
    )
}