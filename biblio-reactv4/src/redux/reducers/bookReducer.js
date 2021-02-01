import * as actionTypes from '../actions/types'


const initState = {
    book: {},
    isPending: false,
    error: ''
}

export const addBook = (state = initState, action = {}) => {
    switch (action.type) {
        case actionTypes.ADD_BOOK_PENDING:
            return Object.assign({}, state, { isPending: true })
        case actionTypes.ADD_BOOK_SUCCESS:
            return Object.assign({}, state, { book: action.payload, isPending: false })
        case actionTypes.ADD_BOOK_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false })
        default:
            return state
    }
}

export const deleteBook = (state = initState, action = {}) => {
    if (action.type === actionTypes.DELETE_BOOK) {
        return Object.assign({}, state)
    }

}


const booksInitialState = {
    books: [],
    isPending: false,
    error: ''
}

export const requestBooks = (state = booksInitialState, action = {}) => {
    switch (action.type) {
        case actionTypes.REQUEST_BOOKS_PENDING:
            return Object.assign({}, state, { isPending: true })
        case actionTypes.REQUEST_BOOKS_SUCCESS:
            return Object.assign({}, state, { books: action.payload, isPending: false })
        case actionTypes.REQUEST_BOOKS_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false })
        default:
            return state
    }
}

const editBookInitState = {
    book: {},
    isPending: false,
    error: ''
}
export const editBook = (state = editBookInitState, action = {}) => {
    switch (action.type) {
        case actionTypes.EDIT_BOOK_PENDING:
            return Object.assign({}, state, { isPending: true });
        case actionTypes.EDIT_BOOK_SUCCESS:
            return Object.assign({}, state, { book: action.payload, isPending: false });
        case actionTypes.EDIT_BOOK_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        default:
            return state;
    }
}

// const getSelectedInitState = {
//     book: {},
//     isPending: false,
//     error: ''
// }

// // getSelectedBook is not used anymore. as editing is done via local state, not by 
// // using the store's state. ** DELETE WHEN DEFINITELY NOT USED **
// export const getSelectedBook = (state = getSelectedInitState, action = {}) => {
//     switch (action.type) {
//         case actionTypes.GET_SELECTED_BOOK_PENDING:
//             return Object.assign({}, state, { isPending: true });
//         case (actionTypes.GET_SELECTED_BOOK_SUCCESS):
//             return Object.assign({}, state, { book: action.payload, isPending: false });
//         case actionTypes.SIGNIN_USER_FAILED:
//             return Object.assign({}, state, { error: action.payload, isPending: false });
//         default:
//             return state;
//     }
// }


// export const clearBook = (state = getSelectedInitState, action = {}) => {
//     if (action.type === actionTypes.CLEAR_BOOK) {
//         return Object.assign({}, state, { book: {}, isPending: false, error: '' })
//     }
//     return state;
// }
