import React from 'react';
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
      changePage: () => push('/about-us')
    }, dispatch),
  };
}

const Home = props => (
  <div>
    <h1>Home</h1>
    <p>Welcome home!</p>
    <p>Count: {props.reducers.counter.count}</p>

    <p>
      <button onClick={props.actions.increment} disabled={props.reducers.counter.isIncrementing}>Increment</button>
      <button onClick={props.actions.incrementAsync} disabled={props.reducers.counter.isIncrementing}>Increment Async</button>
    </p>

    <p>
      <button onClick={props.actions.decrement} disabled={props.reducers.counter.isDecrementing}>Decrementing</button>
      <button onClick={props.actions.decrementAsync} disabled={props.reducers.counter.isDecrementing}>Decrement Async</button>
    </p>

    <p><button onClick={() => props.actions.changePage()}>Go to about page via redux</button></p>
    <button onClick={() => props.actions.changePage()}>Go to about page via redux</button>
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)