import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

import { IUser } from "../../types/IUser";

export default function Users() {
    const navigate = useNavigate();
    const [users, setUsers] = React.useState<IUser[]>([]);

    React.useEffect(() => {
        axios
            .get("http://localhost:5000/users")
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));
    }, []);

    const goToUser = (id: string) => {
        navigate(`/users/${id}`);
    };
    

    return (
        <List>
            {users.map(user => (
                <ListItem onClick={(e) => goToUser(user._id)}>
                    <ListItemAvatar>
                        <Avatar src={user.avatar} />
                    </ListItemAvatar>
                    <ListItemText primary={user.username} secondary={user.createdOn} />
                </ListItem>
            ))}
        </List>
    );
}