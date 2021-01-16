import React, { Component, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { clearErrors } from '../redux/actions/errorActions';
import { Form, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { signInUser } from '../redux/actions/authActions';
import propTypes from 'prop-types';




class SignIn extends Component {

    state = {
        email: '',
        password: '',
        msg: null
    }

    static propsTypes = {
        isAthenticated: propTypes.bool,
        error: propTypes.object.isRequired,
        signIn: propTypes.func.isRequired,
        clearErrors: propTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            //Check for register error
            if (error.id === 'SIGNIN_FAIL') {
                this.setState({ msg: this.props.error.msg })
            } else { this.setState({ msg: null }) }
        }
    }




    onSubmitHandle = (event) => {
        event.preventDefault();
        const { email, password } = this.state;

        const user = {
            email,
            password
        }
        // Attempt to signin
        this.props.login(user);

    }

    handleChange = (event) => {
        // const {value, name} = event.target;

        // dynamically set the state, using whatever is used for name eg username or password:
        //  [name] to value
        this.setState({ [event.target.name]: event.target.value })
        // this.setState({ [name]: value })
    }

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
                <Form onSubmit={this.onSubmitHandle}>
                    {this.props.isAuthenticated ? <Redirect to={"/"} /> : null}
                    {this.state.msg ? <this.AlertError /> : null}
                    <h2>Sign In</h2>
                    <Form.Group controlId="usernameFormGroup">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            name="email"
                            type="text"
                            // value={this.state.email}
                            onChange={this.handleChange}
                            placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="passwordFormGroup">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            name="password"
                            type="password"
                            // value={this.state.password}
                            onChange={this.handleChange}
                            placeholder="Enter password" />
                    </Form.Group>

                    <Button
                        // onClick={this.onSubmitHandle}
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


const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => dispatch(signInUser(user)),
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
