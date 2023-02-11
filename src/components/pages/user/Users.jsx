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
    const page = 1;
    const size = 10;
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        UserService.getAllUsers(page, size)
            .then(response => {
                setUsers(response.data);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, [page, size]);

    const handleRemoveUser = (userId) => {
        setOpenRemoveUserDialog(true);
        setSelectedUserId(userId);
    }

    return (isLoading ? <CircularProgress/> :
        ((users.length === 0) ? <EmptyListCard/> :
                <div>
                    <RemoveUserDialog
                        open={openRemoveUserDialog}
                        onClose={() => setOpenRemoveUserDialog(false)}
                        userId={selectedUserId}
                    />
                    <TableContainer sx={{marginY: 10, maxHeight: 620}}>
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
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={20}
                        rowsPerPage={10}
                        page={page}
                        // onPageChange={}
                        // onRowsPerPageChange={}
                    />
                </div>
        ));
}

export default Users;