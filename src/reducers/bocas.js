import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';
import _ from 'lodash';

import axios from '../helpers/axios';

import { HANDLE_MODAL } from './modals';
import { MENU_GET_ALL } from './menus';

export const BOCA_CREATED = createAction('BOCA_CREATED');
export const BOCA_GET_ALL = createAction('BOCA_GET_ALL');
export const BOCA_ASSIGNED = createAction('BOCA_ASSIGNED');
export const MENU_SELECTED = createAction('MENU_SELECTED');
export const HANDLE_BOCA_INPUT = createAction('HANDLE_BOCA_INPUT');
export const HANDLE_BOCA_LOADER = createAction('HANDLE_BOCA_LOADER');

export const initialState = I.from({
  create : {
    name        : '',
    description : '',
    picture     : '',
    price       : '',
  },
  bocas  : [],
  loader : false,
  selectedMenu : {},
});

export function createBoca (blob) {
  return async (dispatch, getState) => {
    try {
      const { reducers : { bocas : { create, bocas } } } = getState();
      const form = new FormData();
      const { description, name, price } = create;
      form.append('description', description);
      form.append('name', name);
      form.append('price', price);
      form.append('picture', blob);
      const { data } = await axios.post('bocas/create', form);
      const addNewBOCA = I.asMutable(bocas);
      addNewBOCA.unshift(data);
      dispatch(HANDLE_MODAL('createBocaModal'));
      dispatch(HANDLE_BOCA_LOADER());
      dispatch(BOCA_CREATED(addNewBOCA));
    } catch (e) {
      console.log(e);
    }

  }
}

export function getAllBocas () {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('bocas');
      dispatch(BOCA_GET_ALL(data));
    } catch (e) {
      console.log(e);
    }
  }
}

export function handleMenuChange (_id) {
  return (dispatch, getState) => {
    const { reducers : { menus : { menus }, bocas : { selectedMenu } } } = getState();
    if (_id !== selectedMenu._id) {
      const menu = _.find(menus, { _id });
      dispatch(MENU_SELECTED(menu));
    }
  }
}

export function assignBoca (bocaId) {
  return async (dispatch, getState) => {
    try {
      const { reducers : { bocas : { bocas, selectedMenu } } } = getState();
      const { data } = await axios.post('bocas/assign', { bocaId, menuId : selectedMenu._id });
      const newBocas = I.flatMap(bocas, (value) => {
        if (value._id === bocaId) {
          return [];
        } else {
          return value;
        }
      });
      const menuWithNewBoca = I.asMutable(selectedMenu.bocas);
      menuWithNewBoca.unshift(data);
      const menu = I.set(selectedMenu, 'bocas', menuWithNewBoca);
      dispatch(BOCA_ASSIGNED({ bocas : newBocas, selectedMenu : menu }));
    } catch (e) {
      console.log(e);
    }
  }
}

export function removeBoca (bocaId) {
  return async (dispatch, getState) => {
    try {
      const { reducers : { menus : { menus }, bocas : { bocas, selectedMenu } } } = getState();
      const { data } = await axios.post('bocas/remove', { bocaId, menuId : selectedMenu._id });
      const menuWithOutBoca = I.flatMap(selectedMenu.bocas, (value) => value._id === bocaId ? [] : value);

      const menuToModify = _.find(menus, { _id : selectedMenu._id });
      const mutableMenu = I.asMutable(menuToModify);
      const newMenuBocas = I.flatMap(menuToModify.bocas, (value) => value._id === bocaId ? [] : value);
      const newMenus = I.flatMap(menus, (value) => {
        if (value._id === selectedMenu._id) {
          mutableMenu.bocas = newMenuBocas;
          return mutableMenu;
        } else {
          return value;
        }
      });

      const newBocas = I.asMutable(bocas);
      newBocas.unshift(data);
      const menu = I.set(selectedMenu, 'bocas', menuWithOutBoca);

      dispatch(BOCA_ASSIGNED({ bocas : newBocas, selectedMenu : menu }));
      dispatch(MENU_GET_ALL(newMenus));
    } catch (e) {
      console.log(e);
    }
  }
}

export function handleBocaInputs (name, value) {
  return (dispatch) => {
    dispatch(HANDLE_BOCA_INPUT({ name, value }))
  }
}

export function handleBocaLoader () {
  return (dispatch) => {
    dispatch(HANDLE_BOCA_LOADER())
  }
}

export default handleActions({
  BOCA_CREATED : (state, action) => {
    return I.merge(state, { bocas : action.payload });
  },
  BOCA_GET_ALL : (state, action) => {
    return I.merge(state, { bocas : action.payload });
  },
  BOCA_ASSIGNED : (state, action) => {
    const { bocas, selectedMenu } = action.payload;
    return I.merge(state, { bocas, selectedMenu });
  },
  HANDLE_BOCA_INPUT : (state, action) => {
    return I.setIn(state, ['create', action.payload.name], action.payload.value);
  },
  HANDLE_BOCA_LOADER : (state) => {
    return I.set(state, 'loader', !state.loader);
  },
  MENU_SELECTED : (state, action) => {
    return I.set(state, 'selectedMenu', action.payload);
  }
}, initialState)