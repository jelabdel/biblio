// import {  signOutUser } from './userReducer';
import { requestBooks, addBook, editBook, getSelectedBook, clearBook } from './bookReducer';
import { errorReducer } from './errorReducer';
import { authReducer } from './authReducer';
import { combineReducers } from 'redux';







const rootReducer = combineReducers({
    // signUpUser: signUpUser,
    // signOutUser: signOutUser,
    requestBooks: requestBooks,
    getBook: getSelectedBook,
    addBook: addBook,
    editBook: editBook,
    clearBook: clearBook,
    error: errorReducer,
    auth: authReducer
});

export default rootReducer;