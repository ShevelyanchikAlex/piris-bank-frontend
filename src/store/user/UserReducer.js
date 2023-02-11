import * as userActions from './UserActionType';

const userState =
    {
        userName: '',
        email: '',
        role: '',
        isAuth: false,
    }

export const userReducer = (state = userState, action) => {
    switch (action.type) {
        case userActions.SET_USER_NAME:
            return {...state, userName: action.payload};
        case userActions.SET_EMAIL:
            return {...state, email: action.payload};
        case userActions.SET_ROLE:
            return {...state, role: action.payload};
        case userActions.SET_IS_AUTH:
            return {...state, isAuth: action.payload};
        default:
            return state;
    }
}