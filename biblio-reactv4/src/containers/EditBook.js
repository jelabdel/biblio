import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import store from '../redux/store';
import { Form, Button } from 'react-bootstrap';
import { tokenConfig } from '../redux/actions/authActions';
import { editBook, deleteBook } from '../redux/actions/libraryActions'
import { returnErrors } from '../redux/actions/errorActions';



class EditBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            title: '',
            author: '',
            image: '',
            lang: '',
            isread: ''
        }
    }


    componentDidMount() {
        axios.get(`http://localhost:3001/book/${this.state.id}`, tokenConfig(store.getState))
            .then(data => {
                this.setState({
                    title: data.data.title,
                    author: data.data.author,
                    image: data.data.image,
                    lang: data.data.lang,
                    isread: data.data.isread
                })
            })
            .catch(err => {
                returnErrors(err.response.data, err.response.status)
            })
    }


    onSubmitHandle = (event) => {
        event.preventDefault()
        // edit book by dispatching editBook action
        this.props.editBook(this.state);
    }


    handleDelete = (event) => {
        event.preventDefault()
        this.props.deleteBook(this.state.id)
    }


    onHandleChange = (event) => {
        // [e.target.name]: e.target.value
        this.setState({ [event.target.name]: event.target.value });
    }


    render() {
        console.log('this.state.id', this.state)
        // console.log('this.props.book.title', this.props.book.title)
        return (
            <div>EDIT
                <Form>
                    <Form.Group controlId="formBasicText1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control name="title" onChange={this.onHandleChange} type="text" value={this.state.title} />
                    </Form.Group>

                    <Form.Group controlId="formBasicText2">
                        <Form.Label>Author</Form.Label>
                        <Form.Control name="author" onChange={this.onHandleChange} type="text" value={this.state.author} />
                    </Form.Group>

                    <Form.Group controlId="formBasicText3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control name="image" onChange={this.onHandleChange} type="text" value={this.state.image} />
                    </Form.Group>

                    <Form.Group controlId="formBasicText4">
                        <Form.Label>Language</Form.Label>
                        <Form.Control name="lang" onChange={this.onHandleChange} type="text" value={this.state.lang} />
                    </Form.Group>

                    <Form.Group controlId="formBasicText5">
                        <Form.Label>IsRead</Form.Label>
                        <Form.Control name="isread" onChange={this.onHandleChange} type="text" value={this.state.isread} />
                    </Form.Group>
                    <Button
                        onClick={this.onSubmitHandle}
                        className="book-button"
                        variant="outline-light"
                        type="submit"
                    >
                        Save
                    </Button>
                    <Button
                        onClick={this.handleDelete}
                        className="book-button"
                        variant="outline-light"
                        type="submit">
                        <NavLink to={`/${this.state.lang}`}>
                            Delete
                        </NavLink>
                    </Button>
                    <Button
                        className="book-button"
                        variant="outline-light"
                        type="submit">
                        <NavLink to={`/${this.state.lang}`}>
                            To List
                        </NavLink>
                    </Button>
                </Form>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        editBook: (book) => dispatch(editBook(book)),
        deleteBook: (id) => dispatch(deleteBook(id)),
        returnErrors: (data, status) => dispatch(returnErrors(data, status))
    }
}


const mapStateToProps = (state) => {
    return {
        book: state.editBook.book,
        isAuthenticated: state.auth.isAuthenticated
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditBook);