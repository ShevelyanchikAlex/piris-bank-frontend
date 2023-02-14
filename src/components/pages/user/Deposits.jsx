import React, {useEffect, useState} from 'react';
import {
    CircularProgress,
    IconButton, Stack,
    Table,
    TableBody,
    TableCell, TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';
import EmptyListCard from "../EmptyListCard";
import {useNavigate} from "react-router-dom";
import DepositService from "../../../service/DepositService";
import CloseDepositDialog from "./dialogs/CloseDepositDialog";
import Button from "@mui/material/Button";

const Deposits = () => {
    const [deposits, setDeposits] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDepositId, setSelectedDepositId] = useState(0);
    const [openCloseDayDialog, setOpenCloseDayDialog] = useState(false)
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [countOfDeposits, setCountOfDeposits] = useState(10);
    const rowsPerPage = [5, 10, 20];
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        DepositService.getAllDeposits(page, size)
            .then(response => {
                setDeposits(response.data);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
        DepositService.getDepositsCount()
            .then(response => {
                setCountOfDeposits(response.data)
            })
            .catch((error) => console.log(error));
    }, [page, size]);


    const handleCloseDeposit = (depositId) => {
        setOpenCloseDayDialog(true);
        setSelectedDepositId(depositId);
    }

    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeSize = (val) => {
        setSize(parseInt(val.target.value, 10));
        setPage(0);
    }

    return (isLoading ? <CircularProgress/> :
        ((deposits.length === 0) ? <EmptyListCard/> :
                <div>
                    <CloseDepositDialog
                        open={openCloseDayDialog}
                        onClose={() => setOpenCloseDayDialog(false)}
                        depositId={selectedDepositId}
                    />
                    <Stack justifyContent={"center"} marginTop={10} spacing={2} direction="row">
                        <Button variant="outlined" onClick={() => {
                            DepositService.closeDay(1)
                                .then(() => window.location.reload())
                                .catch(e => console.log(e));
                        }}>
                            Close day: 1 month
                        </Button>
                        <Button variant="outlined" onClick={() => {
                            DepositService.closeDay(3)
                                .then(() => window.location.reload())
                                .catch(e => console.log(e));
                        }}>
                            Close day: 3 month
                        </Button>
                        <Button variant="outlined" onClick={() => {
                            DepositService.closeDay(6)
                                .then(() => window.location.reload())
                                .catch(e => console.log(e));
                        }}>
                            Close day: 6 month
                        </Button>
                    </Stack>
                    <TableContainer sx={{height: 500}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Contract number</TableCell>
                                    <TableCell align="right">Contract term</TableCell>
                                    <TableCell align="right">Surname</TableCell>
                                    <TableCell align="right">Amount</TableCell>
                                    <TableCell align="right">Percent</TableCell>
                                    <TableCell align="right">Currency</TableCell>
                                    <TableCell align="right">Is Open</TableCell>
                                    <TableCell align="right">Main account number</TableCell>
                                    <TableCell align="right">Current debit</TableCell>
                                    <TableCell align="right">Current credit</TableCell>
                                    <TableCell align="right">Percent account number</TableCell>
                                    <TableCell align="right">Percent debit</TableCell>
                                    <TableCell align="right">Percent credit</TableCell>
                                    <TableCell align="right">Close deposit</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {deposits.map(deposit => (
                                    <TableRow key={deposit.id} hover role="checkbox" tabIndex={-1}>
                                        <TableCell component="th" scope="row">
                                            {deposit.contractNumber}
                                        </TableCell>
                                        <TableCell align="right">{deposit.contractTerm}</TableCell>
                                        <TableCell align="right">{deposit.user.surname}</TableCell>
                                        <TableCell align="right">{deposit.sumAmount}</TableCell>
                                        <TableCell align="right">{deposit.percent}</TableCell>
                                        <TableCell align="right">{deposit.currency}</TableCell>
                                        <TableCell align="right">{deposit.isOpen ? 'Yes' : 'No'}</TableCell>
                                        <TableCell align="right">{deposit.currentAccount.number}</TableCell>
                                        <TableCell align="right">{deposit.currentAccount.debit}</TableCell>
                                        <TableCell align="right">{deposit.currentAccount.credit}</TableCell>
                                        <TableCell align="right">{deposit.percentAccount.number}</TableCell>
                                        <TableCell align="right">{deposit.percentAccount.debit}</TableCell>
                                        <TableCell align="right">{deposit.percentAccount.credit}</TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                size="large"
                                                aria-label="Close debit"
                                                aria-haspopup="true"
                                                onClick={() => handleCloseDeposit(deposit.id)}
                                                color="inherit"
                                            >
                                                <CreditCardOffIcon/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        sx={{display: "flex", justifyContent: "center"}}
                        rowsPerPageOptions={rowsPerPage}
                        component="div"
                        count={countOfDeposits}
                        rowsPerPage={size}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeSize}
                    />
                </div>
        ));
}

export default Deposits;