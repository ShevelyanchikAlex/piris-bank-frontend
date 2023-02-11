import React, {useEffect, useState} from 'react';
import {Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";
import UserService from "../../../../service/UserService";

const RemoveUserDialog = (props) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        UserService.getUserById(props.userId)
            .then(response => setUser(response.data))
            .catch(e => console.log(e));
    });

    const MessageInfo = () => {
        return !user ?
            <Box display="flex" justifyContent="center">
                <CircularProgress/>
            </Box> :
            <div>
                You definitely want to delete the user: {user.name + ' ' + user.surname}?
            </div>
    }

    return (
        <Dialog open={props.open} onClose={props.onClose} maxWidth='sm' fullWidth>
            <DialogTitle>Delete User</DialogTitle>
            <DialogContent style={{paddingTop: "0px"}}>
                <MessageInfo/>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} variant='contained'
                        style={{background: "grey"}}>Close</Button>
                <Button variant='contained'
                        style={{background: 'red'}}
                        type="submit"
                        disabled={!user}
                        onClick={() => {
                            UserService.deleteUser(user.id)
                                .then()
                                .catch(e => console.log(e));
                            props.onClose();
                            window.location.reload();
                        }}
                >
                    {!user ? <CircularProgress/> : "Delete"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RemoveUserDialog;
