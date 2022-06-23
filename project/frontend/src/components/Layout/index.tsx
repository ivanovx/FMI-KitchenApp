import React from "react";
import { Outlet } from "react-router-dom";
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';

export function Layout() {
    return (
        <ScopedCssBaseline>
            <Outlet />
        </ScopedCssBaseline>
    );
}