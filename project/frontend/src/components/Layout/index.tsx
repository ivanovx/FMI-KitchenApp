import React from "react";
import { Grid, Button, Avatar } from "@mui/material";
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
                            <span>
                                Welcome 
                                <Avatar src={auth.user.user.avatar} component="span"  sx={{ display: "inline-block", width: 45, height: 45 }} />
                                <Link to="/user">{auth.user.user.username}</Link>!
                            </span>
                            <Button onClick={signOut} color="primary" variant="outlined">Sign out</Button>
                        </Grid>
                    </>
                )}
            </Grid>
            <main className={styles.main}>
                <Outlet />
            </main>

            
        </div>
    );
}