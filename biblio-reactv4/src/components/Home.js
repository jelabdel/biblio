import React, { Component } from 'react';
import MainSection from './MainSection';
import LandingPage from './LandingPage';
import { connect } from 'react-redux';



class Home extends Component {

    render() {
        return (
            <div className="mainsection">
                { this.props.isAuthenticated ?
                    <MainSection />
                    :
                    <LandingPage />
                }
            </div>
        )
    }
}


const MapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}


export default connect(MapStateToProps)(Home);