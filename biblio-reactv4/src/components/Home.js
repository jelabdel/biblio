import React, { Component } from 'react';

// import SignIn from '../containers/SignIn';
// import SignUp from '../containers/SignUp';
// import { connect } from 'react-redux';

// import { Button } from 'react-bootstrap'
// import { NavLink } from 'react-router-dom';
import MainSection from './MainSection';

class Home extends Component {

    render() {
        // console.log("props in Home: ", this.props)
        return (
            <div>
                <MainSection />
                {/* <SignIn />
                <h2>Not yet registered?</h2>
                <NavLink to="/signup">
                    <Button
                        className="book-button"
                        variant="outline-light"
                        type="submit">
                        Sign Up
                    </Button>
                </NavLink> */}
            </div >
        )
    }
}

// const mapStateToProps = (state) => {
//     return {
//         currentUser: state.signUpUser.currentUser
//     }
// }


export default Home;