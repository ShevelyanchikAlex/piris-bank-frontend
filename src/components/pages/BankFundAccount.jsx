import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {CardActions, Container} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AccountService from "../../service/AccountService";
import Card from "@mui/material/Card";

const BankFundAccount = () => {
    const navigate = useNavigate();
    const [account, setAccount] = useState({
        id: 1,
        number: "7327132435654",
        accountCode: "BANK_FUND",
        accountActivity: "PASSIVE",
        debit: 0,
        credit: 0,
        clientData: "Bank Fund"
    });

    useEffect(() => {
        AccountService.getBankFundAccount()
            .then(response => setAccount(response.data))
            .catch(e => console.log(e));
    }, []);

    return (
        <Container sx={{marginY: 10}}>
            <h1 style={{textAlign: "center"}}>Bank Fund Account</h1>
            <Card align={"center"}
                  sx={{
                      marginLeft: 40,
                      marginRight: 40,
                      borderRadius: 5,
                      justifyContent: 'center',
                      maxHeight: 520
                  }}>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <CardContent sx={{flex: 1}}>
                        <Typography gutterBottom variant="h6" component="div">
                            Account Code: <label style={{color: "gray"}}>{account.accountCode}</label>
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            Amount: <label style={{color: "gray"}}>{account.credit}</label>
                        </Typography>
                    </CardContent>
                </Box>
            <CardActions style={{justifyContent: "center"}}>
                <Button size="large" onClick={() => navigate(-1)} sx={{borderRadius: 5, border: 1}}>Back</Button>
            </CardActions>
            </Card>
        </Container>
    );
}

export default BankFundAccount;