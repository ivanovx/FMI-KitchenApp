import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Box, Tabs, Tab, Button, TextField, Stack, Divider, List, ListItem, ListItemText, ListItemButton } from "@mui/material";

import RequireAuth from "../Auth/RequireAuth";
import { useAuth } from "../../modules/authContext";

import { IUser } from "../../types/IUser";
import { IRecipe } from "../../types/IRecipe";
import { IComment } from "../../types/IComent";

type IProps = {
    userId: string;
    token: string;
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
            .then(res => {
                console.log(res.data);
                setUser(res.data)
            });
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
                .put(`http://localhost:5000/users/${user._id}`, values, { headers })
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
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Me" />
                    <Tab label="My Recipes" />
                    <Tab label="My Comments" />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <h2>Hi, {user.name}</h2>
                <p>Active from {user.createdOn}</p>
                <p>Last updated {user.updatedOn}</p>
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
                        name="newPassword"
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
                <Recipes userId={user._id} token={auth.user.token} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Comments userId={user._id} token={auth.user.token} />
            </TabPanel>
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

function Recipes({ userId, token }: IProps) {
    const [recipes, setRecipes] = React.useState<IRecipe[]>([]);

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
            "Authorization": `Bearer ${token}`
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
        <Stack spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
            <List>
                {recipes.map(recipe => (
                    <ListItem key={recipe._id}>
                        <ListItemText
                            primary={recipe.title}
                            secondary={recipe.createdOn}
                        />
                        <ListItemButton href={`/recipes/update/${recipe._id}`}>Update</ListItemButton>
                        <ListItemButton onClick={(e) => onDeleteRecipe(recipe._id)}>Delete</ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Stack>
    );
}

function Comments({ userId, token }: IProps) {
    const [comments, setComments] = React.useState<IComment[]>([]);

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
            "Authorization": `Bearer ${token}`
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
        <Stack spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
            <List>
                {comments.map(comment => (
                    <ListItem key={comment._id}>
                        <ListItemText
                            primary={comment._recipe.title}
                            secondary={comment.body}
                        />
                        <ListItemButton onClick={(e) => onDeleteComment(comment._id)}>Delete</ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Stack>
    );
}