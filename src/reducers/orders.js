import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';

import axios from '../helpers/axios';
import { HANDLE_MODAL } from './modals';

export const ORDERS_GET_ALL = createAction('ORDERS_GET_ALL');
export const SELECT_ORDER = createAction('SELECT_ORDER');

export const initialState = I.from({
  orders        : [],
  loader        : false,
  selectedOrder : {},
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

export function changeOrderStatus (_id, status) {
  return async (dispatch, getState) => {
    try {
      const { reducers : { menus : { create, menus } } } = getState();
      const { data } = await axios.post('orders/status', { orderId : _id, status });
      dispatch(ORDERS_GET_ALL(data));
    } catch (e) {
      console.log(e);
    }
  }
}


export function selectOrder (order) {
  return (dispatch) => {
    dispatch(SELECT_ORDER(order));
    dispatch(HANDLE_MODAL('orderDetailModal'));
  }
}

export default handleActions({
  ORDERS_GET_ALL : (state, action) => {
    return I.merge(state, { orders : action.payload });
  },
  SELECT_ORDER   : (state, action) => {
    return I.merge(state, { selectedOrder : action.payload })
  }
}, initialState)