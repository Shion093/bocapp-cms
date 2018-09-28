import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';

import axios from '../helpers/axios';

export const HANDLE_RESTAURANT_INPUT = createAction('HANDLE_RESTAURANT_INPUT');
export const HANDLE_RESTAURANT_LOADER = createAction('HANDLE_RESTAURANT_LOADER');
export const GET_RESTAURANT = createAction('GET_RESTAURANT');

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
  isOpen     : true,
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

export function handleStoreChange (value) {
  return async (dispatch, getState) => {
    try {
      const { reducers : { restaurants : { create } } } = getState();
      const { data } = await axios.post('restaurant/handleStore', create);
    } catch (e) {
      console.log(e);
    }
  }
}

export function getRestaurant () {
  return async (dispatch, getState) => {
    try {
      const { reducers : { auth : { currentUser } } } = getState();
      const { data: { restaurant } } = await axios.get(`restaurant/${currentUser._id}`);
      dispatch(GET_RESTAURANT(restaurant));
    } catch (e) {
      console.log('error', e);
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
  GET_RESTAURANT: (state, action) => {
    const { description, domain, isOpen, name } = action.payload;
    return I.merge(state, { restaurant: { description, domain, isOpen, name } });
  }
}, initialState)