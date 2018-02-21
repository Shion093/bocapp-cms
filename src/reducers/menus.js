import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';

import axios from '../helpers/axios';

import { HANDLE_MODAL } from './modals';
import { MENU_SELECTED } from './bocas';

export const MENU_CREATED = createAction('MENU_CREATED');
export const MENU_GET_ALL = createAction('MENU_GET_ALL');
export const HANDLE_MENU_INPUT = createAction('HANDLE_MENU_INPUT');
export const HANDLE_MENU_LOADER = createAction('HANDLE_MENU_LOADER');

export const initialState = I.from({
  create : {
    name        : '',
    description : '',
    picture     : '',
  },
  menus  : [],
  loader : false,
});

export function createMenu (blob) {
  return async (dispatch, getState) => {
    try {
      const { reducers : { menus : { create, menus } } } = getState();
      const form = new FormData();
      const { description, name } = create;
      form.append('description', description);
      form.append('name', name);
      form.append('picture', blob);
      const { data } = await axios.post('menus/create', form);
      const addNewMenu = I.asMutable(menus);
      addNewMenu.unshift(data);
      dispatch(HANDLE_MODAL('createMenuModal'));
      dispatch(HANDLE_MENU_LOADER());
      dispatch(MENU_CREATED(addNewMenu));
    } catch (e) {
      console.log(e);
    }

  }
}

export function getAllMenus () {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('menus');
      dispatch(MENU_GET_ALL(data));
      dispatch(MENU_SELECTED(data[0]));
    } catch (e) {
      console.log(e);
    }
  }
}

export function handleMenuInputs (name, value) {
  return (dispatch) => {
    dispatch(HANDLE_MENU_INPUT({ name, value }))
  }
}

export function handleMenuLoader () {
  return (dispatch) => {
    dispatch(HANDLE_MENU_LOADER())
  }
}

export default handleActions({
  MENU_CREATED : (state, action) => {
    return I.merge(state, { menus : action.payload, create : initialState.create });
  },
  MENU_GET_ALL : (state, action) => {
    return I.merge(state, { menus : action.payload });
  },
  HANDLE_MENU_INPUT : (state, action) => {
    return I.setIn(state, ['create', action.payload.name], action.payload.value);
  },
  HANDLE_MENU_LOADER : (state) => {
    return I.set(state, 'loader', !state.loader);
  }
}, initialState)