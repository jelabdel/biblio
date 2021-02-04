import React from 'react';
import SignIn from '../containers/SignIn';

const LandingPage = () => {
    return (
        <div className="landingpage">
            <div className="mainsection">
                <h1>BIBLIO</h1>
                <h1>manage your personal library.</h1>
            </div>
            <SignIn />
        </div>
    )
}



export default LandingPage;