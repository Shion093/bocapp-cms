import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Menus from './pages/Menus';
import Bocas from './pages/Bocas';
import Orders from './pages/Orders';
import Login from './pages/Login';

// Components
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import ConnectedRoute from './components/ConnectedRoute';
import ConnectedSwitch from './components/ConnectedSwitch';

// Reducers
import { decrement, decrementAsync, increment, incrementAsync } from './reducers/counter';


function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      increment,
      incrementAsync,
      decrement,
      decrementAsync,
      changePage : (page) => push(page)
    }, dispatch),
  };
}

class App extends Component {
  DefaultContainer = () => {
    return (
      <div>
        <SideBar/>
        <TopBar/>
        <main className='Main'>
          <ConnectedRoute exact path='/' component={Home}/>
          <ConnectedRoute exact path='/menus' component={Menus}/>
          <ConnectedRoute exact path='/bocas' component={Bocas}/>
          <ConnectedRoute exact path='/ordenes' component={Orders}/>
        </main>
      </div>
    )
  };

  LoginContainer = () => {
    return (
      <div className='mainLogin'>
        <main className='mainLogin'>
          <ConnectedRoute exact path='/' render={() => <Redirect to='/login' />}/>
          <ConnectedRoute path='/login' component={Login} />
        </main>
      </div>
    )
  };

  render () {
    const { reducers : { auth : { loggedIn }}} = this.props;
    return (
      <div className='App'>
        <ConnectedSwitch>
          <ConnectedRoute exact path='/(login)' render={
            props => !loggedIn
              ? (this.LoginContainer())
              : (
                <Redirect to={{
                  pathname : '/',
                  state    : { from : props.location }
                }}/>
              )
          } />
          <ConnectedRoute render={
            props => loggedIn
              ? (this.DefaultContainer())
              : (
                <Redirect to={{
                  pathname : '/login',
                  state    : { from : props.location }
                }}/>
              )
          }/>
        </ConnectedSwitch>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
