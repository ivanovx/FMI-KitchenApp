import React from "react";
import { Grid, Button } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

import styles from "./layout.module.css";
import { useAuth } from "../../modules/authContext";

export default function Layout() {
    const auth = useAuth();

    const signOut = () => auth.signOut();

    return (
        <div className={styles.layout}>
            <Grid direction="row" container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={2}>
                    <Link to="/">Home</Link>
                </Grid>
                {!auth.user && (
                    <>
                        <Grid item xs={2}>
                            <Link to="/auth/signin">Sign In</Link>
                        </Grid>
                        <Grid item xs={2}>
                            <Link to="/auth/signup">Sign Up</Link>
                        </Grid>
                    </>
                )}
                {auth.user && (
                    <>
                        <Grid item xs={2}>
                            <Link to="/recipes/create">Create Recipe</Link>
                        </Grid>
                        <Grid item xs={2}>
                            <span className={styles.WelcomeUser}>Welcome {auth.user.user.username}!</span>
                            <Button onClick={signOut} color="primary" variant="outlined">Sign out</Button>
                        </Grid>
                    </>
                )}
            </Grid>
            <Outlet />
        </div>
    );
}