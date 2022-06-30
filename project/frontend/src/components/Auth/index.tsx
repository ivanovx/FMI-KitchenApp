import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { Button, Container, TextField } from '@mui/material';

import store from "../../modules/store";
import { convertBase64 } from "../../modules/images";
import { AuthContext, useAuth } from "../../modules/authContext";
import { SignInSchema, SignUpSchema } from "../../modules/schemas";
import Toast from "../Toast";

type IProps = {
    children: React.ReactNode;
}

export default function AuthProvider({ children }: IProps) {
    const navigate = useNavigate();
    
    const [error, setError] = React.useState(null);
    const [user, setUser] = React.useState(store.get("user", null));

    React.useEffect(() => {
        store.set("user", user);
    }, [user]);

    const signUp = (newUser: any) => {
        axios
            .post("http://localhost:5000/auth/signup", newUser)
            .then(res => {
                console.log(res);
                setError(null);
                navigate("/auth/signin");
            })
            .catch(err => {
                setError(err.response.data);
                console.log(err);
            });
    };

    const signIn = (newUser: any) => {
        axios
            .post("http://localhost:5000/auth/signin", newUser)
            .then(res => {
                console.log(res);
                setUser(res.data);
                setError(null);
                navigate("/");
            })
            .catch(err => {
                setError(err.response.data);
                console.log(err);
            });
    };

    const signOut = () => {
        setUser(null);
        navigate("/");
    };

    return <AuthContext.Provider value={{ user, error, signUp, signIn, signOut }}>{children}</AuthContext.Provider>;
}

export function SignIn() {
    const auth = useAuth();

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: SignInSchema,
        onSubmit: (values: any) => {
            auth.signIn(values);
        }
    });

    return (
        <Container>
            <h2>Sign In</h2>
            {auth.error && <Toast isOpen={true} type="error" message={auth.error} />}
            <form onSubmit={formik.handleSubmit}>
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
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <Button type="submit">Sign In</Button>
            </form>
        </Container>
    );
}

export function SignUp() {
    const auth = useAuth();

    const [avatar, setAvatar] = React.useState(null);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            username: "",
            password: "",
            avatar: "",
        },
        validationSchema: SignUpSchema,
        onSubmit: (values: any) => {
            values.avatar = avatar;
            auth.signUp(values);
        }
    });

    const handleAvatar = async (event: any) => {
        const file = event.target.files[0];
        const base64: any = await convertBase64(file);

        setAvatar(base64);
    };

    return (
        <Container>
            <h2>Sign Up</h2>
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
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <TextField
                    fullWidth
                    name="avatar"
                    label="Avatar"
                    type="file"
                    value={formik.values.avatar}
                    onChange={handleAvatar}
                    error={formik.touched.avatar && Boolean(formik.errors.avatar)}
                    helperText={formik.touched.avatar && formik.errors.avatar}
                />
                <Button type="submit">Sign Up</Button>
            </form>
        </Container>
    );
}