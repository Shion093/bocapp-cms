import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { decrement, decrementAsync, increment, incrementAsync } from '../../reducers/counter';

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
      changePage: () => push('/menus')
    }, dispatch),
  };
}

class Home extends Component {
  render () {
    return (
      <div>
        <h1>BocaApp</h1>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
