import {Route, Routes} from "react-router-dom";
import NotFound from "./pages/error/NotFound";
import SignUp from "./pages/user/forms/SignUp";
import Users from "./pages/user/Users";
import UserItem from "./pages/user/UserItem";
import EditUser from "./pages/user/forms/EditUser";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Users/>} exact={true}/>
            <Route path="/users" element={<Users/>} exact={true}/>
            <Route path="/users/:id" element={<UserItem/>} exact={true}/>
            <Route path="/sign-up" element={<SignUp/>} exact={true}/>
            <Route path="/users/edit/:id" element={<EditUser/>} exact={true}/>
            <Route path="*" element={<NotFound/>} exact={true}/>
        </Routes>
    );
};

export default AppRouter;