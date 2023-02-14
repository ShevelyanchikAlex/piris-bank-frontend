import React, {useEffect, useState} from 'react';
import {Alert, Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar} from "@mui/material";
import Button from "@mui/material/Button";
import DepositService from "../../../../service/DepositService";

const CloseDepositDialog = (props) => {
    const [deposit, setDeposit] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [alertType] = useState('error');
    const [alertText, setAlertText] = useState('');

    useEffect(() => {
        DepositService.getDepositById(props.depositId)
            .then(response => setDeposit(response.data))
            .catch(e => console.log(e));
    });

    const MessageInfo = () => {
        return !deposit ?
            <Box display="flex" justifyContent="center">
                <CircularProgress/>
            </Box> :
            <div>
                You definitely want to close this deposit: {deposit.contractNumber}?
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
                <DialogTitle>Close Deposit</DialogTitle>
                <DialogContent style={{paddingTop: "0px"}}>
                    <MessageInfo/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose} variant='contained'
                            style={{background: "grey"}}>Close</Button>
                    <Button variant='contained'
                            style={{background: 'red'}}
                            type="submit"
                            disabled={!deposit}
                            onClick={() => {
                                DepositService.closeDeposit(deposit.id)
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
                        {!deposit ? <CircularProgress/> : "Close deposit"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CloseDepositDialog;
