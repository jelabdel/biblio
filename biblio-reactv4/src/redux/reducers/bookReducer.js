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
            // console.log('action.payload in addBook: ', action.payload)
            return Object.assign({}, state, { book: action.payload, isPending: false })
        case actionTypes.ADD_BOOK_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false })
        default:
            return state
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