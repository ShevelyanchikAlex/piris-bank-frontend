import * as userActionTypes from "./UserActionType";

export const setUserName = (userName) => ({
    type: userActionTypes.SET_USER_NAME,
    payload: userName,
});

export const setEmail = (email) => ({
    type: userActionTypes.SET_EMAIL,
    payload: email,
});

export const setRole = (role) => ({
    type: userActionTypes.SET_ROLE,
    payload: role,
});

export const setIsAuth = (isAuth) => ({
    type: userActionTypes.SET_IS_AUTH,
    payload: isAuth,
});