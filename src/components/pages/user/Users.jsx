import React, {useEffect, useState} from 'react';
import UserService from "../../../service/UserService";
import {
    CircularProgress,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import EmptyListCard from "../EmptyListCard";
import {useNavigate} from "react-router-dom";
import RemoveUserDialog from "./dialogs/RemoveUserDialog";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [openRemoveUserDialog, setOpenRemoveUserDialog] = useState(false)
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [countOfUsers, setCountOfUsers] = useState(10);
    const rowsPerPage = [5, 10, 20];
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        UserService.getAllUsers(page, size)
            .then(response => {
                setUsers(response.data);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
        UserService.getCountOfUsers()
            .then(response => {
                setCountOfUsers(response.data)
            })
            .catch((error) => console.log(error));
    }, [page, size]);


    const handleRemoveUser = (userId) => {
        setOpenRemoveUserDialog(true);
        setSelectedUserId(userId);
    }

    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeSize = (val) => {
        setSize(parseInt(val.target.value, 10));
        setPage(0);
    }

    return (isLoading ? <CircularProgress/> :
        ((users.length === 0) ? <EmptyListCard/> :
                <div>
                    <RemoveUserDialog
                        open={openRemoveUserDialog}
                        onClose={() => setOpenRemoveUserDialog(false)}
                        userId={selectedUserId}
                    />
                    <TableContainer sx={{marginY: 10, height: 500}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Surname</TableCell>
                                    <TableCell align="right">FathersName</TableCell>
                                    <TableCell align="right">Birthday</TableCell>
                                    <TableCell align="right">Gender</TableCell>
                                    <TableCell align="right">Info</TableCell>
                                    <TableCell align="right">Edit</TableCell>
                                    <TableCell align="right">Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map(user => (
                                    <TableRow key={user.id} hover role="checkbox" tabIndex={-1}>
                                        <TableCell component="th" scope="row">
                                            {user.id}
                                        </TableCell>
                                        <TableCell align="right">{user.name}</TableCell>
                                        <TableCell align="right">{user.surname}</TableCell>
                                        <TableCell align="right">{user.fathersName}</TableCell>
                                        <TableCell
                                            align="right">{new Date(user.birthday).toLocaleDateString()}</TableCell>
                                        <TableCell align="right">{user.gender}</TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                size="large"
                                                aria-label="Info"
                                                aria-haspopup="true"
                                                onClick={() => navigate('/users/' + user.id)}
                                                color="inherit"
                                            >
                                                <InfoIcon/>
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                size="large"
                                                aria-label="Edit"
                                                aria-haspopup="true"
                                                onClick={() => navigate('/users/edit/' + user.id)}
                                                color="inherit"
                                            >
                                                <EditIcon/>
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                size="large"
                                                aria-label="Delete"
                                                aria-haspopup="true"
                                                onClick={() => handleRemoveUser(user.id)}
                                                color="inherit"
                                            >
                                                <DeleteIcon/>
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
                        count={countOfUsers}
                        rowsPerPage={size}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeSize}
                    />
                </div>
        ));
}

export default Users;