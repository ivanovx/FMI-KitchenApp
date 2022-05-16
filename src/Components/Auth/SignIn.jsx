import { useFormik } from "formik";
import { Navigate } from "react-router-dom";
import { Button, TextField } from '@material-ui/core';

import { useAuth } from ".";
import { SignInSchema } from "../../schemas";

export default function SignIn() {
    const auth = useAuth();

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        }, 
        validationSchema: SignInSchema,
        onSubmit: values => {
            auth.signIn(values);
        }
    });

    if (auth.user) {
        return <Navigate to="/" replace={true} />
    }

    return (
        <form onSubmit={formik.handleSubmit}>
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
                id="password" 
                name="password" 
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
            />
            <Button fullWidth type="summary" color="primary" variant="contained">Sign In</Button>
        </form>
    );
}