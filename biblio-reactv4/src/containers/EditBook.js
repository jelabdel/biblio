import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';


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
        fetch('http://localhost:3001/')
            .then(response => response.json())
            .then(data => {
                data.map((bookItem, i) => {
                    if (bookItem.id === Number(this.props.match.params.id)) {
                        this.setState({
                            title: bookItem.title,
                            author: bookItem.author,
                            image: bookItem.image,
                            lang: bookItem.lang,
                            isread: bookItem.isread
                        })
                    }
                    return bookItem
                })
            })
    }


    onSubmitHandle = (event) => {
        event.preventDefault()
        fetch('http://localhost:3001/edit', {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },

            body: JSON.stringify(this.state) // body data type must match "Content-Type" header
        });
    }

    onHandleChange = (event) => {
        // [e.target.name]: e.target.value
        this.setState({ [event.target.name]: event.target.value });
    }



    render() {
        return (
            <div>EDIT
                <Form>
                    <Form.Group controlId="formBasicText1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control name="title" onChange={this.onHandleChange} type="text" defaultValue={this.state.title} />
                    </Form.Group>

                    <Form.Group controlId="formBasicText2">
                        <Form.Label>Author</Form.Label>
                        <Form.Control name="author" onChange={this.onHandleChange} type="text" defaultValue={this.state.author} />
                    </Form.Group>

                    <Form.Group controlId="formBasicText3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control name="image" onChange={this.onHandleChange} type="text" defaultValue={this.state.image} />
                    </Form.Group>

                    <Form.Group controlId="formBasicText4">
                        <Form.Label>Language</Form.Label>
                        <Form.Control name="lang" onChange={this.onHandleChange} type="text" defaultValue={this.state.lang} />
                    </Form.Group>

                    <Form.Group controlId="formBasicText5">
                        <Form.Label>IsRead</Form.Label>
                        <Form.Control name="isread" onChange={this.onHandleChange} type="text" defaultValue={this.state.isread} />
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
                    <Button 
                        className="book-button"
                        variant="outline-light"
                        type="submit">
                        <NavLink to={`/${this.state.lang}`}>
                            Cancel
                     </NavLink>
                    </Button>
                </Form>
            </div>
        )
    }
}


export default EditBook;