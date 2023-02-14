import * as React from 'react';
import {useNavigate} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GroupIcon from '@mui/icons-material/Group';
import {IconButton} from "@mui/material";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AddCardIcon from '@mui/icons-material/AddCard';
import ReceiptIcon from '@mui/icons-material/Receipt';

const Header = () => {
    const navigate = useNavigate();

    const handleSignUpButton = () => navigate('/sign-up');
    const handleUsersButton = () => navigate('/users');
    const handleDepositsButton = () => navigate('/deposits');
    const handleCreateDepositButton = () => navigate('/create-deposit');
    const handleBankFundAccountButton = () => navigate('/bank-fund-account');

    return (
        <Box sx={{flexGrow: 1,}}>
            <AppBar position="fixed">
                <Toolbar>
                    <AccountBalanceIcon
                        sx={{margin: 2}}
                    />
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Piris-Demo-Bank
                    </Typography>
                    <IconButton
                        size="large"
                        aria-label="BankFundAccount"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleBankFundAccountButton}
                        color="inherit">
                        <ReceiptIcon/>
                    </IconButton>
                    <IconButton
                        size="large"
                        aria-label="Deposits"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleDepositsButton}
                        color="inherit">
                        <CreditCardIcon/>
                    </IconButton>
                    <IconButton
                        size="large"
                        aria-label="Add Deposit"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleCreateDepositButton}
                        color="inherit">
                        <AddCardIcon/>
                    </IconButton>
                    <IconButton
                        size="large"
                        aria-label="Users"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleUsersButton}
                        color="inherit">
                        <GroupIcon/>
                    </IconButton>
                    <Button
                        color="inherit"
                        onClick={handleSignUpButton}
                    >Sign Up</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;