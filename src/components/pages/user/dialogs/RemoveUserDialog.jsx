import React, {useEffect, useState} from 'react';
import {Alert, Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar} from "@mui/material";
import Button from "@mui/material/Button";
import UserService from "../../../../service/UserService";

const RemoveUserDialog = (props) => {
    const [user, setUser] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [alertType] = useState('error');
    const [alertText, setAlertText] = useState('');

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
        <div>
            <Snackbar open={showAlert} autoHideDuration={5000} onClose={() => setShowAlert(false)}>
                <Alert severity={alertType} sx={{width: '100%'}}
                       onClose={() => setShowAlert(false)}>
                    {alertText}
                </Alert>
            </Snackbar>
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
                                    .then(() => {
                                        props.onClose();
                                        window.location.reload();
                                    })
                                    .catch(e => {
                                        setAlertText(e.response.data);
                                        setShowAlert(true);
                                    });
                            }}
                    >
                        {!user ? <CircularProgress/> : "Delete"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default RemoveUserDialog;
