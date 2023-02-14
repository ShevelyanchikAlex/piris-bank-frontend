import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {
    Alert,
    CircularProgress,
    FormControl,
    Grid, InputLabel, MenuItem, Select,
    Snackbar,
    TextField
} from "@mui/material";
import Card from "@mui/material/Card";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import UserService from "../../../../service/UserService";
import {useNavigate, useParams} from "react-router-dom";
import DepositService from "../../../../service/DepositService";

const CreateDeposit = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertText, setAlertText] = useState('');
    const [initDepositType] = useState('REVOCABLE');
    const [initCurrency] = useState('USD');
    const [page] = useState(0);
    const [size] = useState(10);
    const [users, setUsers] = useState([]);
    const [deposit, setDeposit] = useState({
        depositType: initDepositType,
        contractNumber: '',
        currency: initCurrency,
        startDate: new Date(),
        endDate: new Date(),
        contractTerm: 1,
        percent: 4.5,
        sumAmount: 0,
        isOpen: true,
        user: {
            name: '',
            surname: '',
            fathersName: '',
            birthday: dayjs(new Date()),
            gender: '',
            passportSeries: '',
            passportNumber: '',
            passportId: '',
            passportIssued: '',
            passportIssuedDate: dayjs(new Date()),
            placeOfBirth: '',
            city: '',
            address: '',
            phoneHomeNumber: '',
            mobileNumber: '',
            email: '',
            addressOfResidence: '',
            familyStatus: '',
            nationality: '',
            disability: '',
            isPensioner: false,
            monthlyIncome: '',
            isReservist: false,
        },
    });

    useEffect(() => {
        UserService.getAllUsers(page, size)
            .then(response => {
                setUsers(response.data);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
        deposit.user = users.at(0);
    }, []);

    const validationSchema = yup.object().shape({
        contractTerm: yup.number().positive("Contract term could be positive"),
        sumAmount: yup.number().positive("Amount could be positive")
    })

    const formik = useFormik({
        initialValues: deposit,
        validationSchema: validationSchema,
        validateOnChange: true,
        enableReinitialize: true,
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            await handleCreateDepositSubmit()
            setSubmitting(false)
        },
    });

    const getRequestDeposit = () => {
        return {
            depositType: formik.values.depositType,
            contractNumber: formik.values.contractNumber,
            currency: formik.values.currency,
            startDate: formik.values.startDate,
            endDate: formik.values.endDate,
            contractTerm: formik.values.contractTerm,
            percent: formik.values.percent,
            sumAmount: formik.values.sumAmount,
            isOpen: formik.values.isOpen,
            user: formik.values.user
        }
    }

    const handleCreateDepositSubmit = () => {
        const requestDeposit = getRequestDeposit();
        console.log(requestDeposit)
        DepositService.createDeposit(requestDeposit)
            .then(() => {
                setAlertText("Deposit successfully created!")
                setAlertType("success")
                navigate('/deposits')
            })
            .catch((error) => {
                setAlertText(error.response.data)
                setAlertType("error")
            })
            .finally(() => {
                setShowAlert(true)
            })
    }

    return (
        <div>
            <h1 style={{marginTop: '6%', textAlign: "center"}}>Create deposit</h1>
            {isLoading ?
                <Box display="flex" justifyContent="center">
                    <CircularProgress/>
                </Box> :
                <Card align={"center"}
                      sx={{
                          marginLeft: 40,
                          marginRight: 40,
                          borderRadius: 5,
                          justifyContent: 'center',
                          maxHeight: 520
                      }}>
                    <form onSubmit={formik.handleSubmit} style={{margin: 10}} noValidate>
                        <Snackbar open={showAlert} autoHideDuration={5000} onClose={() => setShowAlert(false)}>
                            <Alert severity={alertType} sx={{width: '100%'}}
                                   onClose={() => setShowAlert(false)}>
                                {alertText}
                            </Alert>
                        </Snackbar>
                        <Grid container maxHeight={450} overflow={"auto"}>
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Contract term"
                                name={"contractTerm"}
                                defaultValue={formik.values.contractTerm}
                                value={formik.values.contractTerm}
                                onChange={formik.handleChange}
                                error={!!formik.errors.contractTerm} helperText={formik.errors.contractTerm}
                            />
                            <Box sx={{minWidth: 120, margin: 'auto'}}>
                                <FormControl fullWidth>
                                    <InputLabel id="city-select-label">Deposit type</InputLabel>
                                    <Select
                                        value={formik.values.depositType}
                                        name={"depositType"}
                                        label="Deposit type"
                                        onChange={formik.handleChange}
                                        defaultValue={formik.values.depositType}
                                    >
                                        <MenuItem value={'REVOCABLE'} key={0}>
                                            REVOCABLE
                                        </MenuItem>
                                        <MenuItem value={'IRREVOCABLE'} key={1}>
                                            IRREVOCABLE
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{minWidth: 120, margin: 'auto'}}>
                                <FormControl fullWidth>
                                    <InputLabel id="city-select-label">Currency</InputLabel>
                                    <Select
                                        value={formik.values.currency}
                                        name={"currency"}
                                        label="Currency"
                                        onChange={formik.handleChange}
                                        defaultValue={formik.values.currency}
                                    >
                                        <MenuItem value={'USD'} key={0}>
                                            USD
                                        </MenuItem>
                                        <MenuItem value={'EUR'} key={1}>
                                            EUR
                                        </MenuItem>
                                        <MenuItem value={'BYN'} key={2}>
                                            BYN
                                        </MenuItem>
                                        <MenuItem value={'RUB'} key={3}>
                                            RUB
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <TextField
                                margin="normal"
                                fullWidth
                                disabled={true}
                                label="Percent"
                                name={"percent"}
                                value={formik.values.depositType === 'REVOCABLE' ? 8.5 : 15.5}
                                onChange={formik.handleChange}
                                error={!!formik.errors.percent} helperText={formik.errors.percent}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Amount"
                                name={"sumAmount"}
                                defaultValue={formik.values.sumAmount}
                                value={formik.values.sumAmount}
                                onChange={formik.handleChange}
                                error={!!formik.errors.sumAmount} helperText={formik.errors.sumAmount}
                            />
                            <FormControl sx={{m: 1, minWidth: 100}}>
                                <InputLabel id="user-select-label">User</InputLabel>
                                <Select
                                    labelId="user-select-label"
                                    id="user-id"
                                    value={formik.values.user}
                                    name={"user"}
                                    label="User"
                                    onChange={formik.handleChange}
                                    defaultValue={formik.values.user}
                                >
                                    {users.map((user) => {
                                        return <MenuItem
                                            value={user}>{user.name + ' ' + user.surname}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Box style={{display: 'flex', flexDirection: "row", justifyContent: "center"}}>
                            <Button onClick={() => navigate(-1)}
                                    variant='contained'
                                    style={{
                                        margin: 10,
                                        borderRadius: 5,
                                        width: '30%',
                                        background: "grey"
                                    }}>Back</Button>
                            <Button
                                variant='contained'
                                style={{margin: 10, borderRadius: 5, width: '30%', background: '#2196f3'}}
                                type="submit"
                                disabled={!formik.isValid}
                                onSubmit={handleCreateDepositSubmit}
                            >
                                Submit
                            </Button>
                        </Box>
                    </form>
                </Card>
            }
        </div>
    )
}

export default CreateDeposit;