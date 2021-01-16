import { requestBooks, addBook, editBook } from './bookReducer';
import { errorReducer } from './errorReducer';
import { authReducer } from './authReducer';
import { combineReducers } from 'redux';



const rootReducer = combineReducers({
    requestBooks: requestBooks,
    addBook: addBook,
    editBook: editBook,
    error: errorReducer,
    auth: authReducer
});


export default rootReducer;