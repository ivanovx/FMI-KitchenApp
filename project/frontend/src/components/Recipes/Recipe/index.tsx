import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";

import { Grid } from "@mui/material";

import { Typography, Button, TextField, List, ListItem, ListItemText } from "@mui/material";
import { useAuth } from "../../../modules/authContext";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

export default function Recipe() {
    const auth = useAuth();
    const { id } = useParams();
    const [recipe, setRecipe] = React.useState<any>({});
    const [comments, setComments] = React.useState([]);

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
    }, [])

    const formik = useFormik({
        initialValues: {
            body: ""
        },
        onSubmit: (values) => {
            const headers = {
                "Authorization": `Bearer ${auth.user.token}`
            };

            axios
                .post(`http://localhost:5000/comments/${id}`, values, { headers })
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.log(err));
        }
    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <img src={recipe.result} alt={recipe.title} />
                <h1>{recipe.title}</h1>
                <p>{recipe.description}</p>

                {recipe.steps && recipe.steps.map((step: any, index: number) => (
                    <Card sx={{ marginTop: "1rem", marginBottom: "1rem" }} key={index}>
                        <CardMedia
                            component="img"
                            image={step.result}
                            alt={step.result}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Step {index + 1}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {step.description}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Grid>

            <Grid item xs={4}>
                <h2>Ingredients</h2>
                <List dense>
                    {recipe.products && recipe.products.map((ingredient: any, index: number) => (
                        <ListItem key={index}>
                            <ListItemText
                                primary={ingredient.name}
                                secondary={ingredient.amount}
                            />
                        </ListItem>
                    ))}
                </List>
            </Grid>
        </Grid>
    )
}

/*

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
                </form> }
                {comments.map((comment: any, index: number) => (
                    <div key={index}>
                        {comment.body} - {comment.userId} - {comment.createdOn}
                    </div>
                ))}
            </div>
*/