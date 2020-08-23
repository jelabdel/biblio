import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

// import { Redirect } from 'react-router-dom';




class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSignedIn: false,
            email: '',
            password: ''
        }
    }

    // componentDidMount(){
    //     this.setState({
    //         username: '',
    //         password: ''
    //     })  
    // }

    onSubmitHandle = (event) => {
        event.preventDefault();
        fetch('http://localhost:3001/signin', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(this.state)
        })
            .then(response => response.json())
        // .then(user => {
        //     if (user.id) {
        //         //     setCurrentUser(user)
        //         console.log(user)
        //         return <Redirect to="/" />
        //     }
        // })
    }

    handleChange = (event) => {
        const { value, name } = event.target;

        // dynamically set the state, using whatever is used for name eg username or password:
        //  [name] to value
        this.setState({ [name]: value })
    }


    render() {

        return (
            <div>
                <Form>
                    <h2>Sign In</h2>
                    <Form.Group controlId="usernameFormGroup">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            name="email"
                            type="text"
                            value={this.state.email}
                            onChange={this.handleChange}
                            placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="passwordFormGroup">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            placeholder="Enter password" />
                    </Form.Group>

                    <Button
                        onClick={this.onSubmitHandle}
                        className="book-button"
                        variant="outline-light"
                        type="submit">
                        Submit
                </Button>
                </Form>
            </div>
        )
    }
}


export default SignIn;