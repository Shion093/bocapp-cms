import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';
import { push } from 'react-router-redux';

export const LOGGED_IN = createAction('LOGGED_IN');

export const initialState = I.from({
  loggedIn : false,
});

export function fakeLogin () {
  return (dispatch) => {
    dispatch(LOGGED_IN());
    dispatch(push('/'));
  }
}

export default handleActions({
  LOGGED_IN   : (state) => {
    return I.merge(state, { loggedIn : true });
  },
}, initialState)