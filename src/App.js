import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Sidebar, Segment, Menu, Icon, Input } from 'semantic-ui-react'

import './App.css';
import 'semantic-ui-css/semantic.min.css';

// Pages
import Home from './pages/Home';
import Menus from './pages/Menus';
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
              Inicio
            </Menu.Item>
            <Menu.Item name='menus' onClick={this.goToPage('/menus')}>
              <Icon name='food'/>
              Menus
            </Menu.Item>
            <Menu.Item name='bocas' onClick={this.goToPage('/menus')}>
              <Icon name='coffee'/>
              Bocas
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Menu inverted className="top-bar">
              <Menu.Menu position='right'>
                <Menu.Item>
                  <Input icon='search' placeholder='Buscar...' />
                </Menu.Item>
                <Menu.Item name='Salir' />
              </Menu.Menu>
            </Menu>

            <main>
              <Route exact path="/" component={Home}/>
              <Route exact path="/menus" component={Menus}/>
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
