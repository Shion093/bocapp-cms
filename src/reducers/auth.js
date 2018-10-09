import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';
import { push } from 'react-router-redux';
import axios from '../helpers/axios';

// Reducers
import { CLEAR_MENU_STATE } from './menus';
import { CLEAR_PRODUCT_STATE } from './products';

export const LOGGED_IN = createAction('LOGGED_IN');
export const LOGGED_OUT = createAction('LOGGED_OUT');
export const HANDLE_LOGIN_INPUT = createAction('HANDLE_LOGIN_INPUT');
export const SET_USER = createAction('SET_USER');

const localUser = localStorage.getItem('user');

const user = localUser ? JSON.parse(localUser) : { };

export const initialState = I.from({
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
        localStorage.setItem('refreshToken', data.refreshToken);
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

export function clearUser () {
  return (dispatch) => {
    localStorage.setItem('token', '');
    localStorage.setItem('refreshToken', '');
    localStorage.setItem('user', '');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    dispatch(LOGGED_OUT(false));
  }
}

export function handleLogout () {
  return (dispatch) => {
    dispatch(clearUser());
    dispatch(CLEAR_MENU_STATE());
    dispatch(CLEAR_PRODUCT_STATE());
    dispatch(push('/login'));
  }
}

export function handleLoginInputs(type, name, value) {
  return (dispatch) => {
    dispatch(HANDLE_LOGIN_INPUT({ type, name, value }))
  }
}

export default handleActions({
  LOGGED_IN          : (state) => {
    return I.merge(state, { userInfo : initialState.userInfo });
  },
  LOGGED_OUT          : (state) => {
    return I.merge(state, { user : {} });
  },
  HANDLE_LOGIN_INPUT : (state, action) => {
    const { type, name, value } = action.payload;
    return I.setIn(state, [type, name], value);
  },
  SET_USER           : (state, action) => {
    return I.merge(state, { currentUser : action.payload });
  },
}, initialState)