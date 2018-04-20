import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';

import axios from '../helpers/axios';

import { HANDLE_MODAL } from './modals';
import { MENU_SELECTED } from './bocas';

export const MENU_CREATED = createAction('MENU_CREATED');
export const MENU_GET_ALL = createAction('MENU_GET_ALL');
export const HANDLE_MENU_INPUT = createAction('HANDLE_MENU_INPUT');
export const HANDLE_MENU_LOADER = createAction('HANDLE_MENU_LOADER');
export const SELECT_MENU = createAction('SELECT_MENU');
export const CLEAR_BOCA_INPUT = createAction('CLEAR_BOCA_INPUT');

export const initialState = I.from({
  create : {
    name        : '',
    description : '',
    picture     : '',
  },
  edit   : {
    name        : '',
    description : '',
    picture     : '',
    _id         : '',
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

export function updateMenu (blob) {
  return async (dispatch, getState) => {
    try {
      const { reducers : { menus : { edit, menus } } } = getState();
      const form = new FormData();
      const { description, name, _id, picture } = edit;
      form.append('description', description);
      form.append('name', name);
      form.append('_id', _id);
      if (blob) {
        form.append('picture', blob);
      } else {
        form.append('picture', picture);
      }
      const { data } = await axios.post('menus/update', form);
      dispatch(HANDLE_MODAL('editMenuModal'));
      dispatch(HANDLE_MENU_LOADER());
      dispatch(MENU_GET_ALL(data));
      dispatch(CLEAR_BOCA_INPUT());
    } catch (e) {
      console.log(e);
    }

  }
}

export function getAllMenus (select = true) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('menus');
      dispatch(MENU_GET_ALL(data));
      if (select) {
        dispatch(MENU_SELECTED(data[0]));
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export function handleMenuInputs (type, name, value) {
  return (dispatch) => {
    dispatch(HANDLE_MENU_INPUT({ type, name, value }))
  }
}

export function handleMenuLoader () {
  return (dispatch) => {
    dispatch(HANDLE_MENU_LOADER())
  }
}

export default handleActions({
  CLEAR_BOCA_INPUT : (state) => {
    return I.merge(state, { edit : initialState.edit });
  },
  MENU_CREATED       : (state, action) => {
    return I.merge(state, { menus : action.payload, create : initialState.create });
  },
  MENU_GET_ALL       : (state, action) => {
    return I.merge(state, { menus : action.payload });
  },
  HANDLE_MENU_INPUT  : (state, action) => {
    const { type, name, value } = action.payload;
    return I.setIn(state, [type, name], value);
  },
  HANDLE_MENU_LOADER : (state) => {
    return I.set(state, 'loader', !state.loader);
  },
  SELECT_MENU        : (state, action) => {
    const { name, description, picture, _id } = action.payload;
    return I.merge(state, { edit : { name, description, picture, _id } });
  },
}, initialState)