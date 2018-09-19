import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
// Pages
import Home from './pages/Home';
import Menus from './pages/Menus';
import Bocas from './pages/Bocas';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Restaurants from './pages/Restaurants';

// Components
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import ConnectedRoute from './components/ConnectedRoute';
import ConnectedSwitch from './components/ConnectedSwitch';
import { checkAuth } from './helpers/auth';

// Reducers


function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      changePage : (page) => push(page)
    }, dispatch),
  };
}

class App extends Component {
  DefaultContainer = () => {
    const { reducers : { auth : { currentUser } } } = this.props;
    return (
      <div>
        <SideBar/>
        <TopBar/>
        <main className='Main'>
          <ConnectedRoute exact path='/' component={ Home }/>
          <ConnectedRoute exact path='/menus' component={ Menus }/>
          <ConnectedRoute exact path='/bocas' component={ Bocas }/>
          <ConnectedRoute exact path='/ordenes' component={ Orders }/>
          <ConnectedRoute exact path='/restaurantes' render={
            props => currentUser.role === 'superAdmin'
              ? <Restaurants/>
              : <Redirect to={ {
                pathname : '/',
                state    : { from : props.location }
              } } />
          } />
        </main>
      </div>
    )
  };

  LoginContainer = () => {
    return (
      <div className='mainLogin'>
        <main className='mainLogin'>
          <ConnectedRoute exact path='/' render={ () => <Redirect to='/login'/> }/>
          <ConnectedRoute path='/login' component={ Login }/>
        </main>
      </div>
    )
  };

  render() {
    console.log(checkAuth());
    return (
      <div className='App'>
        <ConnectedSwitch>
          <ConnectedRoute exact path='/(login)' render={
            props => !checkAuth()
              ? (this.LoginContainer())
              : (
                <Redirect to={ {
                  pathname : '/',
                  state    : { from : props.location }
                } }/>
              )
          }/>
          <ConnectedRoute render={
            props => checkAuth()
              ? (this.DefaultContainer())
              : (
                <Redirect to={ {
                  pathname : '/login',
                  state    : { from : props.location }
                } }/>
              )
          }/>
        </ConnectedSwitch>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
