import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import './App.css';
import 'semantic-ui-css/semantic.min.css';

// Pages
import Home from './pages/Home';
import Menus from './pages/Menus';

// Components
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';

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
      changePage: (page) => push(page)
    }, dispatch),
  };
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <SideBar>
          <TopBar />
          <main>
            <Route exact path="/" component={Home}/>
            <Route exact path="/menus" component={Menus}/>
          </main>
        </SideBar>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
