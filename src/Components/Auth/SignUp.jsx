import { useFormik } from "formik";
import { Navigate } from "react-router-dom";
import { Button, TextField } from '@material-ui/core';

import { useAuth } from ".";
import { SignUpSchema } from "../../schemas";

export default function SignUp() {
    const auth = useAuth();

    const formik = useFormik({
        initialValues: {
            name: "",
            username: "",
            email: "",
            password: "",
            avatar: "",
            description: "",
        }, 
        validationSchema: SignUpSchema,
        onSubmit: values => {
            auth.signUp(values);
        }
    });

    if (auth.user) {
        return <Navigate to="/" replace={true} />
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <TextField 
                fullWidth 
                id="name" 
                name="name" 
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
            />
            <TextField 
                fullWidth 
                id="username" 
                name="username" 
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
            />
            <TextField 
                fullWidth 
                id="email" 
                name="email" 
                label="Email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
            />
            <TextField 
                fullWidth 
                id="password" 
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
                id="avatar" 
                name="avatar" 
                label="Avatar"
                type="url"
                value={formik.values.avatar}
                onChange={formik.handleChange}
                error={formik.touched.avatar && Boolean(formik.errors.avatar)}
                helperText={formik.touched.avatar && formik.errors.avatar}
            />
            <TextField 
                fullWidth 
                id="description" 
                name="description" 
                label="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
            />
            <Button fullWidth type="summary" color="primary" variant="contained">Sign Up</Button>
        </form>
    );
}