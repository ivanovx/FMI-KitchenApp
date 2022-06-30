import React from "react";

import { 
    Alert,
    Snackbar,
} from "@mui/material";

type IProps = {
    isOpen: boolean;
    type: "error" | "success",
    message: string;
}

export default function Toast({ isOpen, type, message }: IProps) {
    const [open, setOpen] = React.useState(isOpen);

    const handleClose = () => setOpen(false);

    return (
        <Snackbar
            open={open}
            onClose={handleClose}
            autoHideDuration={6000}
            anchorOrigin={{
                vertical: "top",
                horizontal: "center",
            }}>
            <Alert severity={type}>{message}</Alert>
        </Snackbar>
    );
}