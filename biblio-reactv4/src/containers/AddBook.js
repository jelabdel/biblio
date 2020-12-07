import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { addBook } from '../redux/actions/libraryActions';

import { Form, Button, Alert } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';



class AddBook extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            author: '',
            lang: '',
            isread: '',
            image: ''
        }
    }

    onSubmitHandle = (event) => {
        event.preventDefault()
        this.props.addBook(this.state)
    }

    HandleOnChange = (event) => {
        // console.log([event.target.name], event.target.value)
        this.setState({ [event.target.name]: event.target.value });
    }


    AlertError = () => {
        const [show, setShow] = useState(true);
        if (show) {
            return (
                <Alert variant="danger" onClose={() => { setShow(false) }} dismissible>{'YOU ARE NOT SIGNED IN, PLEASE SIGN IN.'}
                </Alert>
            );
        } else
            return null;
    }


    render() {

        return (
            <div>
                <div>ADD BOOK</div>
                {this.props.isAuthenticated ?
                    <Form >
                        <Form.Group controlId="formBasicText1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control name="title" onChange={this.HandleOnChange} type="text" placeholder="Enter title" />
                        </Form.Group>

                        <Form.Group onChange={this.HandleOnChange} controlId="formBasicText">
                            <Form.Label>Author</Form.Label>
                            <Form.Control name="author" type="text" placeholder="Enter Author" />
                        </Form.Group>

                        <Form.Group controlId="formBasicText2">
                            <Form.Label>Image</Form.Label>
                            <Form.Control name="image" onChange={this.HandleOnChange} type="text" placeholder="Enter Image Name eg image.jpg" />
                        </Form.Group>

                        <Form.Group controlId="formBasicText3">
                            <Form.Label>Language</Form.Label>
                            <Form.Control name="lang" onChange={this.HandleOnChange} type="text" placeholder="Enter Language" />
                        </Form.Group>

                        <Form.Group controlId="formBasicText4">
                            <Form.Label>IsRead</Form.Label>
                            <Form.Control name="isread" onChange={this.HandleOnChange} type="text" placeholder="Have you read it?" />
                        </Form.Group>

                        <Button
                            onClick={this.onSubmitHandle}
                            className="book-button"
                            variant="outline-light"
                            type="submit">
                            {/* <NavLink to={`/${this.state.lang}`}> */}
                                Submit
                            {/* </NavLink> */}
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
                    : <this.AlertError />}

                {/* // <h4 className="error">YOU ARE NOT LOGGED IN, PLEASE LOG IN</h4> */}
            </div>
        )
    }

}


const mapDispatchToProps = (dispatch) => {
    return {
        addBook: (book) => dispatch(addBook(book))
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddBook);