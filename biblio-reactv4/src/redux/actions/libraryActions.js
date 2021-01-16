import {
    ADD_BOOK_PENDING,
    ADD_BOOK_SUCCESS,
    ADD_BOOK_FAILED,
    DELETE_BOOK,
    REQUEST_BOOKS_PENDING,
    REQUEST_BOOKS_SUCCESS,
    REQUEST_BOOKS_FAILED,
    LIST_BOOKS,
    EDIT_BOOK_PENDING,
    EDIT_BOOK_SUCCESS,
    EDIT_BOOK_FAILED,
    CLEAR_BOOK,
    // GET_SELECTED_BOOK_PENDING,
    // GET_SELECTED_BOOK_SUCCESS,
    // GET_SELECTED_BOOK_FAILED
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


    axios.post('http://localhost:3001/add', book, tokenConfig(getState))
        // .then(data => console.log('data:', data))
        // method: 'POST', // *GET, POST, PUT, DELETE, etc.
        .then(data => dispatch({ type: ADD_BOOK_SUCCESS, payload: data }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({ type: ADD_BOOK_FAILED })
        })

}


export const editBook = (book) => (dispatch, getState) => {
    console.log('book in editBook:', book)
    dispatch({ type: EDIT_BOOK_PENDING })


    axios.put(`http://localhost:3001/edit/${book.id}`, book, tokenConfig(getState))
        .then(data => dispatch({ type: EDIT_BOOK_SUCCESS, payload: data }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({ type: EDIT_BOOK_FAILED })
        })
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

export const deleteBook = (bookId) => (dispatch, getState) => {
    dispatch({ type: DELETE_BOOK, payload: bookId })
    axios.delete(`http://localhost:3001/book/${bookId}`, tokenConfig(getState))
}

// getSelectedBook is not used anymore. as editing is done via local state, not by 
// using the store's state. ** DELETE WHEN DEFINITELY NOT USED **
// export const getSelectedBook = (bookId) => (dispatch, getState) => {
//     dispatch({ type: GET_SELECTED_BOOK_PENDING })
//     // get the book
//     axios.get(`}`, tokenConfig(getState))
//         .then(data => {
//             // book is in data.data, use this as payload to send book
//             dispatch({ type: GET_SELECTED_BOOK_SUCCESS, payload: data.data })
//         })
//         .catch(err => {
//             dispatch(returnErrors(err.response.data, err.response.status))
//             dispatch({ type: GET_SELECTED_BOOK_FAILED })
//         })
// }




export const clearBook = () => dispatch => {
    dispatch({ type: CLEAR_BOOK })
}