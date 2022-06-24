import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/recipes")
            .then(res => setRecipes(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <ul>
           {recipes.map((recipe: any) => (
                <li>
                    <Link to={`/recipes/${recipe._id}`}>{recipe.title}</Link>
                </li>
           ))} 
        </ul>
    );
}