import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUpUser } from '../redux/actions/authActions';
import { clearErrors } from '../redux/actions/errorActions';
import PropTypes from 'prop-types';


class SignUp extends React.Component {
    state = {
        name: '',
        username: '',
        email: '',
        password: '',
        msg: null
    };

    static propsTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        signUpUser: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }


    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            //Check for register error
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ msg: this.props.error.msg })
            } else { this.setState({ msg: null }) }
        }
    }

    onChangeInput = (event) => {

        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmitHandle = (event) => {
        event.preventDefault()
        const { name, username, email, password } = this.state;

        const newUser = {
            name,
            username,
            email,
            password
        }
        // Attempt to signup/register
        this.props.register(newUser)
        return <Redirect to={"#"} />
    }

    // Show Alert with error message, when closing alert
    // dispatch  clearError action. 
    AlertError = () => {
        const [show, setShow] = useState(true);
        if (show) {
            return (
                <Alert variant="danger" onClose={() => { setShow(false); this.props.handleClearErrors() }} dismissible>{this.props.error.msg}
                </Alert>
            );

        } else
            return null;
    }
    render() {
        return (
            <div>
                < Form onSubmit={this.onSubmitHandle}>
                    {this.state.msg ? <this.AlertError /> : null}

                    <h2>Sign Up</h2>
                    <Form.Group controlId="nameText">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            name="name"
                            // value={this.state.name}
                            onChange={this.onChangeInput}
                            type="text"
                            placeholder="Enter name" />
                    </Form.Group>

                    <Form.Group controlId="usernameText">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            name="username"
                            // value={this.state.username}
                            onChange={this.onChangeInput}
                            type="text"
                            placeholder="Enter username" />
                    </Form.Group>

                    <Form.Group controlId="emailText">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            name="email"
                            // value={this.state.email}
                            onChange={this.onChangeInput}
                            type="text"
                            placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="passwordText">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            name="password"
                            // value={this.state.password}
                            onChange={this.onChangeInput}
                            type="password"
                            placeholder="Enter password" />
                    </Form.Group>

                    <Button
                        onClick={this.onSubmitHandle}
                        className="book-button"
                        variant="outline-light"
                        type="submit">

                        Submit

                    </Button>
                </Form >
            </div >
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (user) => dispatch(signUpUser(user)),
        handleClearErrors: () => dispatch(clearErrors())
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        error: state.error
    }

}

// export default connect(
//     mapStateToProps,
//     { signUpUser, clearErrors }
// )(SignUp)

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
