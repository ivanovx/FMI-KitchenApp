import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../Auth";

import styles from "./layout.module.css";

export default function Layout() {
    const auth = useAuth();
    const signOut = () => auth.signOut();

    return (
        <div className={styles.Layout}>
            <Grid direction="row" container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={2}>
                    <Link to="/">Recipes</Link>
                </Grid>
                {!auth.user && (
                    <>
                        <Grid item xs={2}>
                            <Link to="/signin">Sign In</Link>
                        </Grid>
                        <Grid item xs={2}>
                            <Link to="/signup">Sign Up</Link>
                        </Grid>
                    </>
                )}
                {auth.user && (
                    <>
                        <Grid item xs={2}>
                            <Link to="/recipes">My Recipes</Link>
                        </Grid>
                        <Grid item xs={2}>
                            <Link to="/create-recipe">Create Recipe</Link>
                        </Grid>
                        <Grid item xs={2}>
                            <span className={styles.WelcomeUser}>Welcome {auth.user.username}!</span>
                            <Button onClick={signOut} color="primary" variant="outlined">Sign out</Button>
                        </Grid>
                    </>
                )}
            </Grid>
            <main className={styles.Content}>
                <Outlet />
            </main>
        </div>
    );
}