import {
    ADD_BOOK_PENDING,
    ADD_BOOK_SUCCESS,
    ADD_BOOK_FAILED,
    REQUEST_BOOKS_PENDING,
    REQUEST_BOOKS_SUCCESS,
    REQUEST_BOOKS_FAILED,
    LIST_BOOKS
} from './types';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const listBooks = (books, language) => {
    return {
        type: LIST_BOOKS,
        books,
        language
    }
}


export const addBook = (book) => (dispatch, getState) => {
    dispatch({ type: ADD_BOOK_PENDING })
    const config = {
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    }

    // Request body
    const body = {
        body: JSON.stringify(book) // body data type must match "Content-Type" header
    }
    axios.post('http://localhost:3001/add', body, config, tokenConfig(getState))
        // method: 'POST', // *GET, POST, PUT, DELETE, etc.
        .then(data => dispatch({ type: ADD_BOOK_SUCCESS, payload: data }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))

}

export const requestBooks = () => (dispatch, getState) => {
    dispatch({ type: REQUEST_BOOKS_PENDING })
    axios.get('http://localhost:3001', tokenConfig(getState))
        // .then(response => response.json())
        .then(data => dispatch({ type: REQUEST_BOOKS_SUCCESS, payload: data }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: REQUEST_BOOKS_FAILED })
        })

}