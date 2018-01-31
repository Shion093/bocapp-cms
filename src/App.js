import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Route } from 'react-router-dom';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Input } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import { decrement, decrementAsync, increment, incrementAsync } from './reducers/counter';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
      changePage: (page) => push(page)
    }, dispatch),
  };
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='overlay' width='thin' visible={true} icon='labeled' vertical inverted>
            <Menu.Item name='home' onClick={this.goToPage('/')}>
              <Icon name='home'/>
              Home
            </Menu.Item>
            <Menu.Item name='gamepad' onClick={this.goToPage('/about-us')}>
              <Icon name='gamepad'/>
              Games
            </Menu.Item>
            <Menu.Item name='camera'>
              <Icon name='camera'/>
              Channels
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Menu inverted className="top-bar">
              <Menu.Menu position='right'>
                <Menu.Item name='home' />
                <Menu.Item name='messages' />
                <Menu.Item name='friends' />
              </Menu.Menu>
              <Menu.Menu position='right'>
                <Menu.Item>
                  <Input icon='search' placeholder='Search...' />
                </Menu.Item>
                <Menu.Item name='logout' />
              </Menu.Menu>
            </Menu>

            <main>
              <Route exact path="/" component={Home}/>
              <Route exact path="/about-us" component={About}/>
            </main>

          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
  goToPage = (page) => () => {
    this.props.actions.changePage(page);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
