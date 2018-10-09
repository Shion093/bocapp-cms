import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';

import axios from '../helpers/axios';

import { HANDLE_MODAL } from './modals';
export const HANDLE_STORE_INPUT = createAction('HANDLE_STORE_INPUT');
export const HANDLE_STORE_LOADER = createAction('HANDLE_STORE_LOADER');
export const GET_STORE = createAction('GET_STORE');
export const GET_STORES = createAction('GET_STORES');
export const HANDLE_STORE = createAction('HANDLE_STORE');

export const initialState = I.from({
  create     : {
    name        : '',
    description : '',
    // domain      : '',
    email       : '',
    logo        : '',
    banner      : '',
  },
  edit       : {
    name        : '',
    description : '',
    logo        : '',
    // domain      : '',
    email       : '',
    _id         : '',
  },
  stores     : [],
  menus      : [],
  loader     : false,
  store : {
    _id         : '',
    name        : '',
    isOpen      : true,
    description : '',
    logo        : '',
    banner      : '',
  },
});

export function createStore () {
  return async (dispatch, getState) => {
    try {
      // me falta agregar el cropper
      const { reducers : { store : { create, stores } } } = getState();
      const { data } = await axios.post('store/create', create);
      dispatch(GET_STORES({ stores: [...stores, data ] }));
      dispatch(HANDLE_MODAL('storeModal'));
    } catch (e) {
      console.log(e);
    }
  }
}

export function handleStore (value) {
  return async (dispatch, getState) => {
    try {
      const { reducers : { store : { store: {_id} } } } = getState();
      const { data: { updated } } = await axios.post('store/handleStore', { _id , isOpen: value});
      if (updated) {
        dispatch(HANDLE_STORE({isOpen: value}));
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export function getStore () {
  return async (dispatch, getState) => {
    try {
      const { reducers : { auth : { currentUser } } } = getState();
      const { data: { store } } = await axios.get(`store/${currentUser._id}`);
      dispatch(GET_STORE(store));
    } catch (e) {
      console.log('error', e);
    }
  }
}

export function getAllStores () {
  return async (dispatch, getState) => {
    try {
      const { data: { stores } } = await axios.post('store/allStores');
      dispatch(GET_STORES({ stores }));
    } catch (e) {
      console.log('error', e);
    }
  }
}


export function handleStoreInputs (type, name, value) {
  return (dispatch) => {
    dispatch(HANDLE_STORE_INPUT({ type, name, value }))
  }
}

export function handleMenuLoader () {
  return (dispatch) => {
    dispatch(HANDLE_STORE_LOADER())
  }
}

export default handleActions({
  HANDLE_STORE : (state, action) => {
    const { isOpen } = action.payload;
    return I.merge(state, { store: { ...state.store, isOpen } });
  },
  HANDLE_STORE_INPUT  : (state, action) => {
    const { type, name, value } = action.payload;
    return I.setIn(state, [type, name], value);
  },
  HANDLE_STORE_LOADER : (state) => {
    return I.set(state, 'loader', !state.loader);
  },
  GET_STORE: (state, action) => {
    const { description, domain, logo, banner, isOpen, name, _id } = action.payload;
    return I.merge(state, { store: { description, domain, logo, banner, isOpen, name, _id } });
  },
  GET_STORES: (state, action) => {
    const { stores } = action.payload;
    return I.merge(state, { stores });
  }
}, initialState)