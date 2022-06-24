import axios from "axios";
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
            <div>My comments</div>
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

    return <h1>Recipes</h1>
}