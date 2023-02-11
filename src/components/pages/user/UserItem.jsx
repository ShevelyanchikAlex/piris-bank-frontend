import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import {useNavigate, useParams} from "react-router-dom";
import {CardActions, CardMedia, Container} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import UserService from "../../../service/UserService";
import Box from "@mui/material/Box";

const UserItem = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    useEffect(() => {
        UserService.getUserById(params.id)
            .then(response => setUser(response.data))
            .catch(e => console.log(e));
    }, []);

    return (
        <Container sx={{marginY: 10}}>
            <h1 style={{textAlign: "center"}}>User Info</h1>
            <Card sx={{borderRadius: 5, display: 'flex'}}>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <CardContent sx={{flex: 1}}>
                        <Typography gutterBottom variant="h6" component="div">
                            Name: <label style={{color: "gray"}}>{user.name}</label>
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            Surname: <label style={{color: "gray"}}>{user.surname}</label>
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            Fathers name: <label style={{color: "gray"}}>{user.fathersName}</label>
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            Birthday: <label
                            style={{color: "gray"}}>{new Date(user.birthday).toLocaleDateString()}</label>
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            Gender: <label style={{color: "gray"}}>{user.gender}</label>
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            Place of birth: <label style={{color: "gray"}}>{user.placeOfBirth}</label>
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            Current City: <label style={{color: "gray"}}>{user?.city?.name}</label>
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            Address: <label style={{color: "gray"}}>{user.address}</label>
                        </Typography>
                        {user.mobileNumber &&
                            <Typography gutterBottom variant="h6" component="div">
                                Mobile number: <label style={{color: "gray"}}>{user.mobileNumber}</label>
                            </Typography>
                        }
                    </CardContent>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <CardContent sx={{flex: 1}}>
                        {user.email &&
                            <Typography gutterBottom variant="h6" component="div">
                                Email: <label style={{color: "gray"}}>{user.email}</label>
                            </Typography>
                        }
                        {user.phoneHomeNumber &&
                            <Typography gutterBottom variant="h6" component="div">
                                Home number: <label style={{color: "gray"}}>{user.phoneHomeNumber}</label>
                            </Typography>
                        }
                        <Typography gutterBottom variant="h6" component="div">
                            Address of residence: <label style={{color: "gray"}}>{user.addressOfResidence}</label>
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            Family status: <label style={{color: "gray"}}>{user?.familyStatus?.name}</label>
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            Nationality: <label style={{color: "gray"}}>{user?.nationality?.name}</label>
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            Disability: <label style={{color: "gray"}}>{user?.disability?.name}</label>
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            Pensioner: <label style={{color: "gray"}}>{user.isPensioner ? 'Yes' : 'No'}</label>
                        </Typography>
                        {user.monthlyIncome &&
                            <Typography gutterBottom variant="h6" component="div">
                                Monthly income: <label style={{color: "gray"}}>{user.monthlyIncome}</label>
                            </Typography>}

                        {user.gender === 'M' &&
                            <Typography gutterBottom variant="h6" component="div">
                                Reservist: <label style={{color: "gray"}}>{user.isReservist ? 'Yes' : 'No'}</label>
                            </Typography>
                        }
                    </CardContent>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <CardContent sx={{flex: 1}}>
                        <Typography gutterBottom variant="h6" component="div">
                            Passport series: <label style={{color: "gray"}}>{user.passportSeries}</label>
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            Passport number: <label style={{color: "gray"}}>{user.passportNumber}</label>
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            PassportId: <label style={{color: "gray"}}>{user.passportId}</label>
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            Passport issued: <label style={{color: "gray"}}>{user.passportIssued}</label>
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            Passport issued date: <label
                            style={{color: "gray"}}>{new Date(user.passportIssuedDate).toLocaleDateString()}</label>
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
            <CardActions>
                <Button size="large" onClick={() => navigate(-1)} sx={{borderRadius: 5, border: 1}}>Back</Button>
            </CardActions>
        </Container>
    );
}

export default UserItem;