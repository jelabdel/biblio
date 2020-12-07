import React, { Component, Fragment } from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { logOut } from '../redux/actions/authActions';
import { connect } from 'react-redux';
import propTypes from 'prop-types';



class NavBar extends Component {

    static propTypes = {
        auth: propTypes.object.isRequired
    }


    render() {
        const { isAuthenticated, user } = this.props.auth;
        const authLinks = (
            <Fragment>
                <NavItem >
                    <span className="nav-bar mr-3">
                        <strong> {user ? `Signed in as: ${user.name}` : ''}</strong>
                    </span>
                </NavItem>
                <NavLink className="navLink" onClick={this.props.signOut} to="/"> Sign Out </NavLink>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavLink className="navLink" to="/signup">Sign Up</NavLink>
                <NavLink className="navLink" to="/signin">Sign In</NavLink>
            </Fragment>
        )

        return (
            <div>
                <Navbar fixed="top" className="nav " expand="lg">
                    <Link to="/"><Navbar.Brand>BIBLIO</Navbar.Brand></Link>
                    <Link className="navlink" to="/add">add book</Link>
                    <Link className="navlink" to="/dutch">dutch library</Link>
                    <Link className="navlink" to="/english">english library</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                        {/* <Form inline>
                        <FormControl  type="text" placeholder="Search" className="search-input mr-sm-2" />
                        <Button className="search-button" variant="outline">Search</Button>
                        </Form> */}
                        {isAuthenticated ? authLinks : guestLinks}
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(logOut())
    }
}

const mapStateToProps = state => ({
    auth: state.auth
    // userName: state.auth.user.username
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);    // higher order component 