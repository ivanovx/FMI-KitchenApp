import { useEffect, useState } from "react"
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
        <div>
           {recipes.map((recipe: any) => (
                <h1>{recipe.title}</h1>
           ))} 
        </div>
    );
}