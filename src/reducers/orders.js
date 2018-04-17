import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';

import axios from '../helpers/axios';

export const ORDERS_GET_ALL = createAction('ORDERS_GET_ALL');

export const initialState = I.from({
  orders  : [],
  loader : false,
});

export function getAllOrders () {
  return async (dispatch, getState) => {
    try {
      const { reducers : { menus : { create, menus } } } = getState();
      const { data } = await axios.get('orders/all');
      dispatch(ORDERS_GET_ALL(data));
    } catch (e) {
      console.log(e);
    }
  }
}

export default handleActions({
  ORDERS_GET_ALL : (state, action) => {
    return I.merge(state, { orders : action.payload });
  },
}, initialState)