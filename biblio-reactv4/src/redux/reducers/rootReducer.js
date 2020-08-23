// import {  signOutUser } from './userReducer';
import { requestBooks, addBook } from './bookReducer';
import { errorReducer } from './errorReducer';
import { authReducer } from './authReducer';
import { combineReducers } from 'redux';





const rootReducer = combineReducers({
    // signUpUser: signUpUser,
    // signOutUser: signOutUser,
    requestBooks: requestBooks,
    addBook: addBook,
    error: errorReducer,
    auth: authReducer
});

export default rootReducer;