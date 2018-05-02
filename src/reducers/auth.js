import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';
import { push } from 'react-router-redux';
import axios from '../helpers/axios';

export const LOGGED_IN = createAction('LOGGED_IN');
export const LOGGED_OUT = createAction('LOGGED_OUT');
export const HANDLE_LOGIN_INPUT = createAction('HANDLE_LOGIN_INPUT');
export const SET_USER = createAction('SET_USER');

const localUser = localStorage.getItem('user');

const user = localUser ? JSON.parse(localUser) : {};

export const initialState = I.from({
  loggedIn    : !!localStorage.getItem('token'),
  userInfo    : {
    email    : '',
    password : '',
  },
  currentUser : user,
});

export function handleLogin() {
  return async (dispatch, getState) => {
    try {
      const { reducers : { auth : { userInfo } } } = getState();
      const { data } = await axios.post('auth/login/admin', userInfo);
      if (data.token && data.user) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        dispatch(LOGGED_IN(true));
        dispatch(SET_USER(data.user));
        dispatch(push('/'));
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export function handleLogout() {
  return async (dispatch, getState) => {
    try {
      const { reducers : { auth : { userInfo } } } = getState();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch(LOGGED_OUT(false));
      dispatch(push('/login'));
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
  LOGGED_IN          : (state, action) => {
    return I.merge(state, { loggedIn : action.payload, userInfo : initialState.userInfo });
  },
  LOGGED_OUT          : (state, action) => {
    return I.merge(state, { loggedIn : action.payload, user : {} });
  },
  HANDLE_LOGIN_INPUT : (state, action) => {
    const { type, name, value } = action.payload;
    return I.setIn(state, [type, name], value);
  },
  SET_USER           : (state, action) => {
    return I.merge(state, { currentUser : action.payload });
  },
}, initialState)