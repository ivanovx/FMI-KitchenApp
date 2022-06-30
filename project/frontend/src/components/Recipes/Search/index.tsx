import axios from "axios";
import React from "react";

export default function SearchRecipe() {
    const [recipes, setRecipes] = React.useState<any[]>([]);

    React.useEffect(() => {
        axios
            .get("http://localhost:5000/recipes")
            .then(res => {
                setRecipes(res.data);
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleSearchInput = (event: any) => {
        event.preventDefault();

        setRecipes(recipes => recipes.filter(r => r.title.includes(event.target.value)));

        console.log(recipes);
    };

    return (
        <div>
            <input type="text" onChange={handleSearchInput} />
        </div>
    );
};