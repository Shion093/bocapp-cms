import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Menus from './pages/Menus';
import Bocas from './pages/Bocas';
import Orders from './pages/Orders';

// Components
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import BocaModal from './components/BocaModal';
import BocaModalEdit from './components/BocaModalEdit';

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
  // componentWillReceiveProps (newProps) {
  //   console.log(newProps);
  //   if (newProps.reducers.routing.location.pathname === '/bocas') {
  //     document.body.style.overflowY = 'hidden';
  //   } else {
  //     document.body.style.overflowY = 'auto';
  //   }
  // }

  // componentDidMount () {
  //   if (this.props.reducers.routing.location.pathname === '/bocas') {
  //     document.body.style.overflowY = 'hidden';
  //   } else {
  //     document.body.style.overflowY = 'auto';
  //   }
  // }
  render() {
    return (
      <div className="App">
        <SideBar/>
        <TopBar />
        <BocaModal />
        <BocaModalEdit />
        <main className="Main">
          <Route exact path="/" component={Home}/>
          <Route exact path="/menus" component={Menus}/>
          <Route exact path="/bocas" component={Bocas}/>
          <Route exact path="/ordenes" component={Orders}/>
        </main>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
