import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';
import _ from 'lodash';

import axios from '../helpers/axios';

import { HANDLE_MODAL } from './modals';
import { getAllMenus, MENU_GET_ALL } from './menus';

export const BOCA_CREATED = createAction('BOCA_CREATED');
export const BOCA_GET_ALL = createAction('BOCA_GET_ALL');
export const BOCA_ASSIGNED = createAction('BOCA_ASSIGNED');
export const MENU_SELECTED = createAction('MENU_SELECTED');
export const HANDLE_BOCA_INPUT = createAction('HANDLE_BOCA_INPUT');
export const HANDLE_BOCA_LOADER = createAction('HANDLE_BOCA_LOADER');
export const SELECT_BOCA = createAction('SELECT_BOCA');
export const CLEAR_BOCA_INPUT = createAction('CLEAR_BOCA_INPUT');
export const CLEAR_SELECTED_MENU = createAction('CLEAR_SELECTED_MENU');
export const CLEAR_BOCA_STATE = createAction('CLEAR_BOCA_STATE');

export const initialState = I.from({
  create       : {
    name        : '',
    description : '',
    picture     : '',
    price       : '',
  },
  edit         : {
    name        : '',
    description : '',
    picture     : '',
    price       : '',
    _id         : '',
    menu        : '',
  },
  bocas        : [],
  loader       : false,
  selectedMenu : {},
});

export function createBoca (blob) {
  return async (dispatch, getState) => {
    try {
      const {
        reducers : {
          bocas : { create, bocas },
          auth : { currentUser : { restaurant } }
        }
      } = getState();
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
      dispatch(CLEAR_BOCA_INPUT());
    } catch (e) {
      console.log(e);
    }

  }
}

export function updateBoca (blob) {
  return async (dispatch, getState) => {
    try {
      const { reducers : { bocas : { edit, menus, selectedMenu } } } = getState();
      const form = new FormData();
      const { description, name, _id, picture, price } = edit;
      form.append('description', description);
      form.append('name', name);
      form.append('_id', _id);
      form.append('price', price);
      form.append('menuId', selectedMenu._id);
      if (blob) {
        form.append('picture', blob);
      } else {
        form.append('picture', picture);
      }
      const { data } = await axios.post('bocas/update', form);
      dispatch(HANDLE_MODAL('editBocaModal'));
      dispatch(HANDLE_BOCA_LOADER());
      dispatch(BOCA_GET_ALL(data.bocas));
      dispatch(MENU_SELECTED(data.menu));
      dispatch(CLEAR_BOCA_INPUT());
    } catch (e) {
      console.log(e);
    }

  }
}

export function deleteBoca (bocaId) {
  return async (dispatch, getState) => {
    try {
      const { reducers : { bocas : { selectedMenu } } } = getState();
      const { data } = await axios.post('bocas/delete', { bocaId, menuId : selectedMenu._id });
      dispatch(BOCA_GET_ALL(data.bocas));
      dispatch(MENU_SELECTED(data.menu));
    } catch (e) {
      console.log(e);
    }
  }
}

export function getAllBocas () {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get('bocas/admin/all');
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
      const { reducers : { bocas : { bocas, selectedMenu } } } = getState();
      const { data } = await axios.post('bocas/remove', { bocaId, menuId : selectedMenu._id });

      const newBocas = I.asMutable(bocas);
      newBocas.unshift(data.boca);

      dispatch(BOCA_ASSIGNED({ bocas : newBocas, selectedMenu : data.menu }));
      dispatch(getAllMenus(false));
    } catch (e) {
      console.log(e);
    }
  }
}

export function handleBocaInputs (type, name, value) {
  return (dispatch) => {
    dispatch(HANDLE_BOCA_INPUT({ type, name, value }))
  }
}

export function handleBocaLoader () {
  return (dispatch) => {
    dispatch(HANDLE_BOCA_LOADER())
  }
}

export default handleActions({
  BOCA_CREATED       : (state, action) => {
    return I.merge(state, { bocas : action.payload });
  },
  BOCA_GET_ALL       : (state, action) => {
    return I.merge(state, { bocas : action.payload });
  },
  BOCA_ASSIGNED      : (state, action) => {
    const { bocas, selectedMenu } = action.payload;
    return I.merge(state, { bocas, selectedMenu });
  },
  HANDLE_BOCA_INPUT  : (state, action) => {
    const { type, name, value } = action.payload;
    return I.setIn(state, [type, name], value);
  },
  HANDLE_BOCA_LOADER : (state) => {
    return I.set(state, 'loader', !state.loader);
  },
  MENU_SELECTED      : (state, action) => {
    return I.set(state, 'selectedMenu', action.payload);
  },
  SELECT_BOCA        : (state, action) => {
    const { name, description, picture, _id, price, menu } = action.payload;
    return I.merge(state, { edit : { name, description, picture, _id, price, menu } });
  },
  CLEAR_BOCA_INPUT   : (state) => {
    return I.merge(state, { edit : initialState.edit, create : initialState.create });
  },
  CLEAR_SELECTED_MENU   : (state) => {
    return I.merge(state, { selectedMenu : initialState.selectedMenu });
  },
  CLEAR_BOCA_STATE : (state) => {
    return I.merge(state, initialState);
  },
}, initialState)