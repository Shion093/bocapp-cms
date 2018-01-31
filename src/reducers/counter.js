import { createAction, handleActions } from 'redux-actions';

const INCREMENT_REQUESTED = createAction('INCREMENT_REQUESTED');
const INCREMENT = createAction('INCREMENT');
const DECREMENT_REQUESTED = createAction('DECREMENT_REQUESTED');
const DECREMENT = createAction('DECREMENT');

const initialState = {
  count          : 0,
  isIncrementing : false,
  isDecrementing : false,
};

export const increment = () => {
  return dispatch => {
    dispatch(INCREMENT_REQUESTED());

    dispatch(INCREMENT());
  }
};

export const incrementAsync = () => {
  return dispatch => {
    dispatch(INCREMENT_REQUESTED());

    return setTimeout(() => {
      dispatch(INCREMENT())
    }, 3000)
  }
};

export const decrement = () => {
  return dispatch => {
    dispatch(DECREMENT_REQUESTED());

    dispatch(DECREMENT())
  }
};

export const decrementAsync = () => {
  return dispatch => {
    dispatch(DECREMENT_REQUESTED());

    return setTimeout(() => {
      dispatch(DECREMENT())
    }, 3000)
  }
};

export default handleActions({
  INCREMENT_REQUESTED : (state, action) => {
    return {
      ...state,
      isIncrementing : true
    }
  },
  INCREMENT : (state, action) => {
    return {
      ...state,
      count          : state.count + 1,
      isIncrementing : !state.isIncrementing
    }
  },
  DECREMENT_REQUESTED : (state, action) => {
    return {
      ...state,
      isDecrementing : true
    }
  },
  DECREMENT : (state, action) => {
    return {
      ...state,
      count          : state.count - 1,
      isDecrementing : !state.isDecrementing
    }
  },
}, initialState)