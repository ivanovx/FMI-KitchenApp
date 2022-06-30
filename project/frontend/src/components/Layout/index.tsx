import React from "react";
import { Link, Outlet } from "react-router-dom";

import {
    Grid,
    Button,
    Avatar,
    Container 
} from "@mui/material";

import { blue } from "@mui/material/colors";

import { useAuth } from "../../modules/authContext";

export default function Layout() {
    const auth = useAuth();

    const GuestUser = () => (
        <>
            <Grid item xs={2}>
                <Link to="/auth/signin">Sign In</Link>
            </Grid>
            <Grid item xs={2}>
                <Link to="/auth/signup">Sign Up</Link>
            </Grid>
        </>
    );

    const SignedUser = () => (
        <>
            <Grid item xs={2}>
                <Link to="/recipes/create">Create Recipe</Link>
            </Grid>
            <Grid item xs={2}>
                <span>
                    Welcome
                    <Avatar src={auth.user.avatar} component="span" sx={{ display: "inline-block", width: 45, height: 45 }} />
                    <Link to="/dashboard">{auth.user.username}</Link>!
                </span>
                <Button onClick={auth.signOut} color="primary" variant="outlined">Sign out</Button>
            </Grid>
        </>
    );

    const containerSx = { 
        display: "flex", 
        flexFlow: "column",
        height: "100%",
        flex: 1,
        paddingY: "1rem",
        borderRadius: "5px",
        backgroundColor: blue[50], 
    };

    const mainSx =  {
        marginY: "1rem"
    };

    return (
        <Container sx={containerSx}>
            <Grid direction="row" container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={2}>
                    <Link to="/">Recipes</Link>
                </Grid>
                <Grid item xs={2}>
                    <Link to="/recipes/search">Search</Link>
                </Grid>

                {auth.user ? <SignedUser /> : <GuestUser />}
            </Grid>
            <Container component="main" sx={mainSx}>
                <Outlet />
            </Container>
            <Container component="footer">
                (c) Ivan Ivanov
            </Container>
        </Container>
    );
}