import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAuth } from "../../modules/authContext";
import RequireAuth from "../Auth/RequireAuth";

type RecipesProps = {
    userId: string;
}

export default function User() {
    const auth = useAuth();

    return (
        <RequireAuth>
            <h1>Weclome {auth.user.user.username}</h1>
            <div>Change password</div>
            <div>
                <h3>My recipes</h3>
                <Recipes userId={auth.user.user._id} />
            </div>
            <div>
                <h3>My comments</h3>
                <Comments userId={auth.user.user._id} />
            </div>
        </RequireAuth>
    );
}

function Recipes({ userId }: RecipesProps) {
    const { user } = useAuth(); 
    const [recipes, setRecipes] = useState<any[]>([]);
    
    const headers = {
        "Authorization": `Bearer ${user.token}`
    };

    useEffect(() => {
        axios
            .get(`http://localhost:5000/users/${userId}/recipes`, { headers })
            .then(res => {
                console.log(res);
                setRecipes(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <ul>
            {recipes.map((recipe: any, index: number) => (
                <li key={index}>
                    <Link to={`/recipes/${recipe._id}`}>{recipe.title} - {recipe.createdOn}</Link>
                </li>
            ))}
        </ul>
    )
}

function Comments({ userId }: RecipesProps) {
    const { user } = useAuth(); 
    const [comments, setComments] = useState<any[]>([]);
    
    const headers = {
        "Authorization": `Bearer ${user.token}`
    };

    useEffect(() => {
        axios
            .get(`http://localhost:5000/users/${userId}/comments`, { headers })
            .then(res => {
                console.log(res);
                setComments(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <ul>
            {comments.map((comment: any, index: number) => (
                <li key={index}>
                    <Link to={`/recipes/${comment.recipeId}`}>{comment.recipeId} - {comment.createdOn}</Link>
                </li>
            ))}
        </ul>
    )
}