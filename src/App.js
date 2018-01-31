import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Route } from 'react-router-dom';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Input } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css';

// Pages
import Home from './pages/Home';
import About from './pages/About';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu secondary>
          <Menu.Item name='home' />
          <Menu.Item name='messages' />
          <Menu.Item name='friends' />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
            <Menu.Item name='logout' />
          </Menu.Menu>
        </Menu>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='overlay' width='thin' visible={true} icon='labeled' vertical inverted>
            <Menu.Item name='home'>
              <Icon name='home'/>
              Home
            </Menu.Item>
            <Menu.Item name='gamepad'>
              <Icon name='gamepad'/>
              Games
            </Menu.Item>
            <Menu.Item name='camera'>
              <Icon name='camera'/>
              Channels
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>

            <main>
              <Route exact path="/" component={Home}/>
              <Route exact path="/about-us" component={About}/>
            </main>

          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default App;
