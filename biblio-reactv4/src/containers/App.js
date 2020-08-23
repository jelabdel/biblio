import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// import { connect } from 'react-redux';

import store from '../redux/store';

import Home from '../components/Home';
import MainSection from '../components/MainSection';
import EnglishLibrary from '../components/EnglishLibrary';
import ArabicLibrary from '../components/ArabicLibrary';
import DutchLibrary from '../components/DutchLibrary';
import AddBook from '../containers/AddBook';
import EditBook from '../containers/EditBook';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import NavBar from '../components/NavBar';

import { loadUser } from '../redux/actions/authActions';
// import { setCurrentUser } from '../redux/actions/userActions'

import './App.css';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {

    return (
      <div className="App">
        <NavBar />
        <h1>BIBLIO</h1>
        <div >
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/mainsection' component={MainSection} />
            <Route exact path='/english' component={EnglishLibrary} />
            <Route exact path='/arabic' component={ArabicLibrary} />
            <Route exact path='/dutch' component={DutchLibrary} />
            <Route exact path='/add' component={AddBook} />
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/edit/:id' component={EditBook} />
          </Switch>
        </div>
      </div>
    );
  }
}



export default App;
