import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';
import _ from 'lodash';

import axios from '../helpers/axios';

import { HANDLE_MODAL } from './modals';
import { MENU_SELECTED, CLEAR_SELECTED_MENU, BOCA_GET_ALL } from './bocas';

export const HANDLE_RESTAURANT_INPUT = createAction('HANDLE_RESTAURANT_INPUT');
export const HANDLE_RESTAURANT_LOADER = createAction('HANDLE_RESTAURANT_LOADER');

export const initialState = I.from({
  create     : {
    name        : '',
    description : '',
    domain      : '',
    email       : '',
  },
  edit       : {
    name        : '',
    description : '',
    domain      : '',
    email       : '',
    _id         : '',
  },
  menus      : [],
  loader     : false,
  restaurant : {},
});

export function createRestaurant (bocaId) {
  return async (dispatch, getState) => {
    try {
      const { reducers : { restaurants : { create } } } = getState();
      const { data } = await axios.post('restaurant/create', create);
    } catch (e) {
      console.log(e);
    }
  }
}

export function getRestaurant () {
  return async (dispatch, getState) => {
    try {
      const { reducers : { restaurants : { create } } } = getState();
      const { data } = await axios.get('restaurant');
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }
}


export function handleRestaurantInputs (type, name, value) {
  return (dispatch) => {
    dispatch(HANDLE_RESTAURANT_INPUT({ type, name, value }))
  }
}

export function handleMenuLoader () {
  return (dispatch) => {
    dispatch(HANDLE_RESTAURANT_LOADER())
  }
}

export default handleActions({
  HANDLE_RESTAURANT_INPUT  : (state, action) => {
    const { type, name, value } = action.payload;
    return I.setIn(state, [type, name], value);
  },
  HANDLE_RESTAURANT_LOADER : (state) => {
    return I.set(state, 'loader', !state.loader);
  },
}, initialState)