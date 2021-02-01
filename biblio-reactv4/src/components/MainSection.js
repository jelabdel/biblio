import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';



class MainSection extends Component {
    render() {
        return (
            <div>
                <div className="section-holder">
                    <NavLink className='main-section' language={"dutch"} to='/dutch'>dutch</NavLink>
                    <NavLink className='main-section' language={"english"} to='/english'>english</NavLink>
                    <NavLink className='main-section' language={"arabic"} to='/arabic'>arabic</NavLink>
                </div>
                <div className="section-holder"><NavLink className='main-section' to='/add'>Add Book</NavLink></div>
            </div>
        )
    }
}



export default MainSection;