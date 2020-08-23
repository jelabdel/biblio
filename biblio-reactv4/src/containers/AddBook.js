import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addBook } from '../redux/actions/libraryActions'

import { Form, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';



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
        this.props.onHandleSubmit(this.state)
    }

    HandleOnChange = (event) => {
        // console.log([event.target.name], event.target.value)
        this.setState({ [event.target.name]: event.target.value });
    }


    render() {

        return (
            <div>
                <div>ADD BOOK</div>
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
                        <NavLink to={`/${this.state.lang}`}>
                            Submit
                     </NavLink>
                    </Button>
                </Form>
            </div>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        onHandleSubmit: (book) => dispatch(addBook(book))
    }

}

export default connect(null, mapDispatchToProps)(AddBook);