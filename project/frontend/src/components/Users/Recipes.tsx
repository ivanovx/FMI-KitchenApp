import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";

import {
    Chip,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
} from "@mui/material";

type RecipeProps = {
    recipe: any;
};

export default function UserRecipes() {
    const {id} = useParams();
    const [recipes, setRecipes] = React.useState([]);
 
    React.useEffect(() => {
         axios
             .get(`http://localhost:5000/users/${id}/recipes`)
             .then(res => setRecipes(res.data))
             .catch(err => console.log(err));
     }, []);
 
     return (
        <Grid container spacing={2}>
            {recipes.map((recipe: any, index: number) => {
                return (
                    <Grid item xs={4} sx={{ marginTop: "3rem", marginBottom: "3rem" }} key={index}>
                        <Recipe recipe={recipe} />
                    </Grid>
                );
            })}
        </Grid>
     );
}

export const Recipe = ({ recipe }: RecipeProps) => {
    return (
        <Card>
            <CardMedia
                component="img"
                height="195"
                image={recipe.result}
                alt={recipe.title}
            />
            <CardContent>
                <Link to={`/recipes/${recipe._id}`}>
                    <h3>{recipe.title}</h3>
                </Link>
                <Chip label={recipe.level} variant="outlined" />
                <Typography variant="body2">{recipe.description}</Typography>
            </CardContent>
        </Card>
    );
};