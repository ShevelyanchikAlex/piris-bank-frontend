import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {
    Alert,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid, InputLabel, MenuItem, Radio, RadioGroup, Select,
    Snackbar,
    TextField
} from "@mui/material";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import Box from "@mui/material/Box";
import CityService from "../../../../service/CityService";
import DisabilityService from "../../../../service/DisabilityService";
import FamilyStatusService from "../../../../service/FamilyStatusService";
import NationalityService from "../../../../service/NationalityService";
import dayjs from "dayjs";
import UserService from "../../../../service/UserService";
import {useNavigate, useParams} from "react-router-dom";

const EditUser = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [genders, setGenders] = useState(['M', 'F']);
    const [isPensionerValues, setIsPensionerValues] = useState(['Yes', 'No']);
    const [isReservistValues, setIsReservistValues] = useState(['Yes', 'No']);
    const [cities, setCities] = useState([]);
    const [disabilities, setDisabilities] = useState([]);
    const [familyStatuses, setFamilyStatuses] = useState([]);
    const [nationalities, setNationalities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertText, setAlertText] = useState('');
    const [initialUser, setInitialUser] = useState({});

    useEffect(() => {
        UserService.getUserById(params.id)
            .then(response => {
                response.data.birthday = new Date(response.data.birthday);
                response.data.passportIssuedDate = new Date(response.data.passportIssuedDate);
                response.data.email = response.data.emai == null ? '' : response.data.email;
                response.data.phoneHomeNumber = response.data.phoneHomeNumber == null ? '' : response.data.phoneHomeNumber;
                response.data.mobileNumber = response.data.mobileNumber == null ? '' : response.data.mobileNumber;
                response.data.monthlyIncome = response.data.monthlyIncome == null ? '' : response.data.monthlyIncome;
                setInitialUser(response.data)
            })
            .catch(e => console.log(e));
        fetchData();
    }, []);

    async function fetchData() {
        setIsLoading(true);
        await CityService.getAllCities(1, 10)
            .then(response => {
                setCities(response.data);
            })
            .catch(() => setIsLoading(false));
        await DisabilityService.getAllDisabilities(1, 10)
            .then(response => {
                setDisabilities(response.data);
            })
            .catch(() => setIsLoading(false));
        await FamilyStatusService.getAllFamilyStatuses(1, 10)
            .then(response => {
                setFamilyStatuses(response.data);
            })
            .catch(() => setIsLoading(false));
        await NationalityService.getAllNationalities(1, 10)
            .then(response => {
                setNationalities(response.data);
            })
            .catch(() => setIsLoading(false));
        setIsLoading(false);
    }

    const validationSchema = yup.object().shape({
        name: yup.string().required('Name cannot be empty')
            .matches('^([A-Z]{1}[a-z]{1,23})$', 'Invalid name').min(1),
        surname: yup.string().required('Surname cannot be empty')
            .matches('^([A-Z]{1}[a-z]{1,23})$', 'Invalid Surname').min(1),
        fathersName: yup.string().required('Fathers name cannot be empty')
            .matches('^([A-Z]{1}[a-z]{1,23})$', 'Invalid fathers name').min(1),
        birthday: yup.string().required('Birthday name cannot be empty'),
        gender: yup.object().required('Gender name cannot be empty'),
        passportNumber: yup.string().required('Passport number cannot be empty')
            .matches('^([0-9]{7})$', 'Invalid passport number')
            .min(7, "Invalid length of passport number"),
        passportSeries: yup.string().required('Passport series name cannot be empty')
            .matches('^([a-zA-Z]{2})$', 'Invalid passport series'),
        passportId: yup.string().required('Passport Id name cannot be empty')
            .matches('^([1-6][0-9]{6}[ABCKEMH][0-9]{3}(PB|BA|BI)[0-9])$', 'Invalid passport id'),
        passportIssuedDate: yup.string().required('Passport issued date cannot be empty'),
        placeOfBirth: yup.string().required('Place of birth cannot be empty'),
        city: yup.object().required('City cannot be empty'),
        address: yup.string().required('Address cannot be empty').nullable(),
        phoneHomeNumber: yup.string()
            .matches('^([0-9]{7})$', 'Invalid phone home number')
            .min(7, "Invalid length of phone home number")
            .max(7, "Invalid length of phone home number"),
        mobileNumber: yup.string()
            .matches('^\\+375(17|29|33|44)[0-9]{7}$', 'Invalid mobile phone number'),
        email: yup.string().email('Invalid email'),
        addressOfResidence: yup.string().required('Address of residence cannot be empty').nullable(),
        familyStatus: yup.object().required('Family status cannot be empty').nullable(),
        nationality: yup.object().required('Nationality cannot be empty').nullable(),
        disability: yup.object().required('Disability cannot be empty').nullable(),
        monthlyIncome: yup.number().positive("Monthly income could be positive"),
    })

    const formik = useFormik({
        initialValues: initialUser,
        validationSchema: validationSchema,
        validateOnChange: true,
        enableReinitialize: true,
        onSubmit: async (values, {setSubmitting}) => {
            console.log(values)
            setSubmitting(true)
            await handleSubmit()
            setSubmitting(false)
        },
    });

    const handleSubmit = () => {
        const requestUser = {
            id: formik.values.id,
            name: formik.values.name,
            surname: formik.values.surname,
            fathersName: formik.values.fathersName,
            birthday: formik.values.birthday,
            gender: formik.values.gender,
            passportSeries: formik.values.passportSeries,
            passportNumber: formik.values.passportNumber,
            passportIssuedDate: formik.values.passportIssuedDate,
            passportId: formik.values.passportId,
            passportIssued: formik.values.passportIssued,
            placeOfBirth: formik.values.placeOfBirth,
            city: {id: formik.values.city.id, name: formik.values.city.name},
            address: formik.values.address,
            phoneHomeNumber: formik.values.phoneHomeNumber === '' ? null : formik.values.phoneHomeNumber,
            mobileNumber: formik.values.mobileNumber === '' ? null : formik.values.mobileNumber,
            email: formik.values.email === '' ? null : formik.values.email,
            addressOfResidence: formik.values.addressOfResidence,
            familyStatus: {id: formik.values.familyStatus.id, name: formik.values.familyStatus.name},
            nationality: {id: formik.values.nationality.id, name: formik.values.nationality.name},
            disability: {id: formik.values.disability.id, name: formik.values.disability.name},
            isPensioner: formik.values.isPensioner,
            monthlyIncome: formik.values.monthlyIncome === '' ? null : formik.values.monthlyIncome,
            isReservist: formik.values.isReservist,
        }

        console.log(requestUser)

        UserService.updateUser(requestUser)
            .then(() => {
                setAlertText("User successfully updated!")
                setAlertType("success")
                setTimeout(3000);
                navigate('/users')
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
            <h1 style={{marginTop: '6%', textAlign: "center"}}>Edit User</h1>
            {isLoading ? <CircularProgress style={{marginLeft: '50%', marginRight: '50%', marginTop: '10%'}}/> :
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
                                required
                                fullWidth
                                label="Name"
                                name={"name"}
                                defaultValue={formik.values.name}
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={!!formik.errors.name} helperText={formik.errors.name}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="surname"
                                name={"surname"}
                                defaultValue={formik.values.surname}
                                value={formik.values.surname}
                                onChange={formik.handleChange}
                                error={!!formik.errors.surname} helperText={formik.errors.surname}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="fathersName"
                                name={"fathersName"}
                                defaultValue={formik.values.fathersName}
                                value={formik.values.fathersName}
                                onChange={formik.handleChange}
                                error={!!formik.errors.fathersName} helperText={formik.errors.fathersName}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    label="Birthday"
                                    inputFormat="YYYY/MM/DD"
                                    name={"birthday"}
                                    value={formik.values.birthday}
                                    maxDate={dayjs(new Date())}
                                    onChange={newValue => formik.setFieldValue('birthday', newValue)}
                                    error={!!formik.errors.birthday} helperText={formik.errors.birthday}
                                    renderInput={(params) =>
                                        <TextField {...params}
                                                   required
                                                   value={formik.values.birthday}
                                                   name={"birthday"}
                                                   margin="normal"
                                                   fullWidth
                                                   error={!!formik.errors.birthday} helperText={formik.errors.birthday}
                                        />
                                    }
                                />
                            </LocalizationProvider>
                            <FormControl sx={{margin: 'auto'}}>
                                <FormLabel id="gender-label">Gender</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="gender-radio-buttons-group-label"
                                    name="gender"
                                    defaultValue={formik.values.gender}
                                >
                                    {
                                        genders.map((gender) => {
                                            return (
                                                <FormControlLabel
                                                    value={gender}
                                                    label={gender}
                                                    onChange={() => {
                                                        formik.setFieldValue('gender', gender);
                                                    }}
                                                    control={<Radio/>}
                                                />
                                            )
                                        })
                                    }
                                </RadioGroup>
                            </FormControl>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Passport series"
                                inputProps={{maxLength: 2, style: {textTransform: "uppercase"}}}
                                name={"passportSeries"}
                                defaultValue={formik.values.passportSeries}
                                value={formik.values.passportSeries}
                                onChange={formik.handleChange}
                                error={!!formik.errors.passportSeries} helperText={formik.errors.passportSeries}
                            />
                            <TextField
                                required
                                margin="normal"
                                type={"text"}
                                fullWidth
                                label="Passport number"
                                value={formik.values.passportNumber}
                                defaultValue={formik.values.passportNumber}
                                inputProps={{maxLength: 7}}
                                onChange={formik.handleChange}
                                name={"passportNumber"}
                                error={!!formik.errors.passportNumber} helperText={formik.errors.passportNumber}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Passport Id"
                                name={"passportId"}
                                defaultValue={formik.values.passportId}
                                value={formik.values.passportId}
                                onChange={formik.handleChange}
                                error={!!formik.errors.passportId}
                                helperText={formik.errors.passportId}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Passport issued"
                                name={"passportIssued"}
                                defaultValue={formik.values.passportIssued}
                                value={formik.values.passportIssued}
                                onChange={formik.handleChange}
                                error={!!formik.errors.passportIssued} helperText={formik.errors.passportIssued}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    label="Passport issued date"
                                    inputFormat="YYYY/MM/DD"
                                    name={"passportIssuedDate"}
                                    value={formik.values.passportIssuedDate}
                                    onChange={newValue => formik.setFieldValue('passportIssuedDate', newValue)}
                                    maxDate={dayjs(new Date())}
                                    error={!!formik.errors.passportIssuedDate}
                                    helperText={formik.errors.passportIssuedDate}
                                    renderInput={(params) =>
                                        <TextField {...params}
                                                   required
                                                   name={"passportIssuedDate"}
                                                   margin="normal"
                                                   fullWidth
                                                   error={!!formik.errors.passportIssuedDate}
                                                   helperText={formik.errors.passportIssuedDate}
                                        />
                                    }
                                />
                            </LocalizationProvider>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Place of birth"
                                name={"placeOfBirth"}
                                defaultValue={formik.values.placeOfBirth}
                                value={formik.values.placeOfBirth}
                                onChange={formik.handleChange}
                                error={!!formik.errors.placeOfBirth} helperText={formik.errors.placeOfBirth}
                            />
                            <Box sx={{minWidth: 120, margin: 'auto'}}>
                                <FormControl fullWidth>
                                    <InputLabel id="city-select-label">Current city</InputLabel>
                                    <Select
                                        value={formik.values.city}
                                        name={"city"}
                                        label="Current city"
                                        onChange={formik.handleChange}
                                        // defaultValue={formik.values.city}
                                    >
                                        {
                                            cities.map((item, index) => (
                                                <MenuItem value={item} key={index}>
                                                    {item.name}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Address"
                                name={"address"}
                                defaultValue={formik.values.address}
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                error={!!formik.errors.address} helperText={formik.errors.address}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Home phone number"
                                name={"phoneHomeNumber"}
                                defaultValue={formik.values.phoneHomeNumber}
                                value={formik.values.phoneHomeNumber}
                                onChange={formik.handleChange}
                                error={!!formik.errors.phoneHomeNumber} helperText={formik.errors.phoneHomeNumber}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Mobile phone number"
                                name={"mobileNumber"}
                                defaultValue={formik.values.mobileNumber}
                                value={formik.values.mobileNumber}
                                onChange={formik.handleChange}
                                error={!!formik.errors.mobileNumber} helperText={formik.errors.mobileNumber}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Email"
                                name={"email"}
                                defaultValue={formik.values.email}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={!!formik.errors.email} helperText={formik.errors.email}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Address of residence"
                                name={"addressOfResidence"}
                                defaultValue={formik.values.addressOfResidence}
                                value={formik.values.addressOfResidence}
                                onChange={formik.handleChange}
                                error={!!formik.errors.addressOfResidence} helperText={formik.errors.addressOfResidence}
                            />
                            <Box sx={{margin: 'auto'}} style={{minWidth: 200, display: 'grid'}}>
                                <FormControl sx={{m: 1}}>
                                    <InputLabel id="familyStatus-select-label">Family Status</InputLabel>
                                    <Select
                                        labelId="familyStatus-select-label"
                                        id="familyStatus"
                                        name={"familyStatus"}
                                        value={formik.values.familyStatus}
                                        label="Family status"
                                        onChange={formik.handleChange}
                                        defaultValue={familyStatuses.at(0)}
                                    >
                                        {familyStatuses.map((familyStatus) => {
                                            return <MenuItem
                                                value={familyStatus}>{familyStatus.name}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                                <FormControl sx={{m: 1}}>
                                    <InputLabel id="familyStatus-select-label">Nationality</InputLabel>
                                    <Select
                                        labelId="nationality-select-label"
                                        id="nationality-select"
                                        value={formik.values.nationality}
                                        name={"nationality"}
                                        label="Nationality"
                                        onChange={formik.handleChange}
                                        defaultValue={nationalities.at(0)}
                                    >
                                        {nationalities.map((nationality) => {
                                            return <MenuItem
                                                value={nationality}>{nationality.name}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                                <FormControl sx={{m: 1}}>
                                    <InputLabel id="disability-select-label">Disability</InputLabel>
                                    <Select
                                        labelId="disability-select-label"
                                        id="disability-select"
                                        value={formik.values.disability}
                                        name={"disability"}
                                        label="Disability"
                                        defaultValue={disabilities.at(0)}
                                        onChange={formik.handleChange}
                                    >
                                        {disabilities.map((disability) => {
                                            return <MenuItem value={disability}>{disability.name}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                                <FormControl sx={{m: 1}}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Pensioner</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="isPensioner"
                                        defaultValue={formik.values.isPensioner ? isPensionerValues.at(0) : isPensionerValues.at(1)}
                                    >
                                        {
                                            isPensionerValues.map((isPensioner) => {
                                                return (
                                                    <FormControlLabel
                                                        value={isPensioner}
                                                        label={isPensioner}
                                                        onChange={() => {
                                                            formik.setFieldValue('isPensioner', isPensioner === 'Yes');
                                                        }}
                                                        control={<Radio/>}
                                                    />
                                                )
                                            })
                                        }
                                    </RadioGroup>
                                </FormControl>
                            </Box>

                            <TextField
                                margin="normal"
                                fullWidth
                                label="Monthly income"
                                name={"monthlyIncome"}
                                defaultValue={formik.values.monthlyIncome}
                                value={formik.values.monthlyIncome}
                                onChange={formik.handleChange}
                                error={!!formik.errors.monthlyIncome} helperText={formik.errors.monthlyIncome}
                            />

                            {formik.values.gender && formik.values.gender === genders.at(0) &&
                                <FormControl sx={{m: 'auto'}}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Reservist</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="isReservist-label"
                                        name="isReservist"
                                        defaultValue={formik.values.isReservist ? isReservistValues.at(0) : isReservistValues.at(1)}
                                    >
                                        {
                                            isReservistValues.map((isReservist) => {
                                                return (
                                                    <FormControlLabel
                                                        value={isReservist}
                                                        label={isReservist}
                                                        onChange={() => {
                                                            formik.setFieldValue('isReservist', isReservist === 'Yes');
                                                        }}
                                                        control={<Radio/>}
                                                    />
                                                )
                                            })
                                        }
                                    </RadioGroup>
                                </FormControl>
                            }
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
                                disabled={!formik.isValid && !formik.dirty}
                                onClick={handleSubmit}
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

export default EditUser;