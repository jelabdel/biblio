// AUTH REDUCER
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    SIGNIN_USER_SUCCESS,
    SIGNIN_USER_FAILED,
    LOGOUT_SUCCESS,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILED,
    SIGNIN_USER_PENDING,
    SIGNUP_USER_PENDING
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case USER_LOADING:
        case SIGNUP_USER_PENDING:
        case SIGNIN_USER_PENDING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };
        case SIGNIN_USER_SUCCESS:
        case SIGNUP_USER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,  // the user and the token
                isAuthenticated: true,
                isLoading: false,
            }
        case AUTH_ERROR:
        case SIGNIN_USER_FAILED:
        case LOGOUT_SUCCESS:
        case SIGNUP_USER_FAILED:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
            }
        default:
            return state;
    }

}