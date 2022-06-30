import axios from "axios";
import { Link } from "react-router-dom";
import React from "react";

import { useAuth } from "../../modules/authContext";
import RequireAuth from "../Auth/RequireAuth";
import { useFormik } from "formik";
import { Box, Tabs, Tab, Button, TextField } from "@mui/material";
import { IUser } from "../../types/IUser";

type RecipesProps = {
    userId: string;
}

type ITabPanelProps = {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export default function Dashboard() {
    const auth = useAuth();
    const [user, setUser] = React.useState<IUser>({
        _id: "",
        name: "",
        email: "",
        username: "",
        password: "",
    });

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const headers = {
        "Authorization": `Bearer ${auth.user.token}`
    };

    React.useEffect(() => {
        axios
            .get(`http://localhost:5000/users/${auth.user.id}`, { headers })
            .then(res => setUser(res.data));
    }, []);

    const formik = useFormik({
        initialValues: {
            name: user.name,
            email: user.email,
            username: user.username,
            newPassword: "",
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            console.log(values);

            axios
                .post(`http://localhost:5000/users/${user._id}`, values, { headers })
                .then(res => {
                    console.log(res);
                    axios
                        .get(`http://localhost:5000/users/${auth.user.id}`, { headers })
                        .then(res => setUser(res.data));
                })
                .catch(err => console.log(err));
        }
    })

    return (
        <RequireAuth>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Me" />
                        <Tab label="My Recipes" />
                        <Tab label="My Comments" />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <h2>Hi, {user.name}</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            name="name"
                            label="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField
                            fullWidth
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            fullWidth
                            name="username"
                            label="Username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                        />
                        <TextField
                            fullWidth
                            name="password"
                            label="New password"
                            type="password"
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                            helperText={formik.touched.newPassword && formik.errors.newPassword}
                        />
                        <Button type="submit">Update profile</Button>
                    </form>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Recipes userId={user._id} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Comments userId={user._id} />
                </TabPanel>
            </Box>
        </RequireAuth>
    );
}

function TabPanel({ children, value, index, }: ITabPanelProps) {
    return (
        <div hidden={value !== index}>
            {value === index && children}
        </div>
    );
}

/*
 <h1>Welcome {user.name}</h1>
            


            <div>
                <h3>My recipes</h3>
                <Recipes userId={auth.user.id} />
            </div>
            <div>
                <h3>My comments</h3>
                <Comments userId={auth.user.id} />
            </div>

*/

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