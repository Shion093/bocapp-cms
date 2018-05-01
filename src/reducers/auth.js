import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';
import { push } from 'react-router-redux';
import axios from '../helpers/axios';

export const LOGGED_IN = createAction('LOGGED_IN');
export const HANDLE_LOGIN_INPUT = createAction('HANDLE_LOGIN_INPUT');

export const initialState = I.from({
  loggedIn : false,
  userInfo : {
    email    : '',
    password : '',
  }
});

export function handleLogin() {
  return async (dispatch, getState) => {
    try {
      const { reducers : { auth : { userInfo } } } = getState();
      const { data } = await axios.post('auth/login/admin', userInfo);
      console.log(data);
      // dispatch(LOGGED_IN());
      // dispatch(push('/'));
    } catch (err) {
      console.log(err);
    }
  }
}

export function handleLoginInputs(type, name, value) {
  return (dispatch) => {
    dispatch(HANDLE_LOGIN_INPUT({ type, name, value }))
  }
}

export default handleActions({
  LOGGED_IN          : (state) => {
    return I.merge(state, { loggedIn : true });
  },
  HANDLE_LOGIN_INPUT : (state, action) => {
    const { type, name, value } = action.payload;
    return I.setIn(state, [type, name], value);
  },
}, initialState)