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
        <h1>Home</h1>
        <p>Welcome home!</p>
        <p>Count: {this.props.reducers.counter.count}</p>
        <p>
          <button onClick={this.props.actions.increment} disabled={this.props.reducers.counter.isIncrementing}>Increment</button>
          <button onClick={this.props.actions.incrementAsync} disabled={this.props.reducers.counter.isIncrementing}>Increment Async</button>
        </p>

        <p>
          <button onClick={this.props.actions.decrement} disabled={this.props.reducers.counter.isDecrementing}>Decrementing</button>
          <button onClick={this.props.actions.decrementAsync} disabled={this.props.reducers.counter.isDecrementing}>Decrement Async</button>
        </p>

        <p><button onClick={() => this.props.actions.changePage()}>Go to about page via redux</button></p>
        <button onClick={() => this.props.actions.changePage()}>Go to about page via redux</button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
