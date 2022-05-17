import React from "react";

import { RequireAuth } from "../Auth";

export default function MyRecipes() {
    return (
        <RequireAuth>
            <h1>My recipes</h1>
        </RequireAuth>
    );        
}