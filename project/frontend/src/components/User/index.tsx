import axios from "axios";
import { Link } from "react-router-dom";
import React from "react";

import { useAuth } from "../../modules/authContext";
import RequireAuth from "../Auth/RequireAuth";
import { useFormik } from "formik";

type RecipesProps = {
    userId: string;
}

export default function User() {
    const auth = useAuth();
    const [user, setUser] = React.useState<any>({});
   
    const headers = {
        "Authorization": `Bearer ${auth.user.token}`
    };

    React.useEffect(() => {
        axios
            .get(`http://localhost:5000/users/${auth.user.id}`, { headers })
            .then(res => {
                console.log(res);
                setUser(res.data);
            });
    }, []);

    const formik = useFormik({
        initialValues: {
            name: user.name,
            email: user.email,
            username: user.username,
            password: ""
        },
        onSubmit: (values) => {
            console.log(values);
        }
    })

    return (
        <RequireAuth>
            <h1>Welcome {user.name}</h1>
            <div>
                <h3>My recipes</h3>
                <Recipes userId={auth.user.id} />
            </div>
            <div>
                <h3>My comments</h3>
                <Comments userId={auth.user.id} />
            </div>
        </RequireAuth>
    );
}

function Recipes({ userId }: RecipesProps) {
    const auth = useAuth();
    const [recipes, setRecipes] = React.useState<any[]>([]);

    React.useEffect(() => {
        axios
            .get(`http://localhost:5000/users/${userId}/recipes`)
            .then(res => {
                console.log(res);
                setRecipes(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const onDeleteRecipe = React.useCallback((recipeId: string) => {
        const headers = {
            "Authorization": `Bearer ${auth.user.token}`
        };
        
        console.log("delete recipe");
        axios
            .delete(`http://localhost:5000/recipes/${recipeId}`, { headers })
            .then(res => {
                console.log(res);
                axios
                    .get(`http://localhost:5000/users/${userId}/recipes`)
                    .then(res => {
                        console.log(res);
                        setRecipes(res.data);
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <ul>
            {recipes.map((recipe: any, index: number) => (
                <li key={index}>
                    <Link to={`/recipes/${recipe._id}`}>{recipe.title} - {recipe.createdOn}</Link>
                    <Link to={`/recipes/update/${recipe._id}`}>Update</Link>
                    <button onClick={(e) => onDeleteRecipe(recipe._id)}>Delete</button>
                </li>
            ))}
        </ul>
    )
}

function Comments({ userId }: RecipesProps) {
    const auth = useAuth();
    const [comments, setComments] = React.useState<any[]>([]);

    React.useEffect(() => {
        axios
            .get(`http://localhost:5000/users/${userId}/comments`)
            .then(res => {
                console.log(res);
                setComments(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const onDeleteComment = React.useCallback((commentId: string) => {
        const headers = {
            "Authorization": `Bearer ${auth.user.token}`
        };
        
        console.log("delete comment");
        axios
            .delete(`http://localhost:5000/comments/${commentId}`, { headers })
            .then(res => {
                console.log(res);
                axios
                    .get(`http://localhost:5000/users/${userId}/comments`)
                    .then(res => {
                        console.log(res);
                        setComments(res.data);
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <ul>
            {comments.map((comment: any, index: number) => (
                <li key={index}>
                    <Link to={`/recipes/${comment._recipe._id}`}>{comment._recipe.title} - {comment.createdOn}</Link>
                    <button onClick={(e) => onDeleteComment(comment._id)}>Delete</button>
                </li>
            ))}
        </ul>
    )
}