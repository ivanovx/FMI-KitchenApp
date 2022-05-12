import { useState, useEffect } from "react";

export default function App(props) {
    const [users, setUsers] = useState({});
    const [recipes, setRecipes] = useState({});

    useEffect(() => {

    }, [users]);

    useEffect(() => {

    }, [recipes]);

    return <h1>Hello Word</h1>
};