
import axios from 'axios';
import { returnErrors } from './errorActions'
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    SIGNIN_USER_SUCCESS,
    SIGNIN_USER_FAILED,
    SIGNUP_USER_PENDING,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILED,
    LOGOUT_SUCCESS
} from './types';



// Check token and load user
export const loadUser = () => (dispatch, getState) => {

    // User loading
    dispatch({ type: USER_LOADING });



    axios.get('http://localhost:3001/user', tokenConfig(getState))
        .then(res => {
            console.log('res.data in loadUser:', res.data)
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            })

        })

}

//SIGNUP/REGISTER USER
export const signUpUser = (user) => dispatch => {
    dispatch({ type: SIGNUP_USER_PENDING })

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request Body
    // const body = {
    //     body: JSON.stringify(user)
    // }


    axios.post('http://localhost:3001/signup', user, config)
        .then(res => dispatch({
            type: SIGNUP_USER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: SIGNUP_USER_FAILED
            });
        })
}



//Setup config/headers and token
export const tokenConfig = getState => {
    // Get token from localstorage
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    // If token, add to headers
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}


// SIGNIN USER
export const signInUser = (user) => dispatch => {
    dispatch({ type: SIGNUP_USER_PENDING })

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request Body
    // const body = {
    //     body: JSON.stringify(user)
    // }


    axios.post('http://localhost:3001/signin', user, config)
        .then(res => dispatch({
            type: SIGNIN_USER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'SIGNIN_FAIL'));
            dispatch({
                type: SIGNIN_USER_FAILED
            });
        })
}



// LOGOUT USER
export const logOut = () => {
    return ({ type: LOGOUT_SUCCESS })
}