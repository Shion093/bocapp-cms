import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';

// Actions
import { SELECT_MENU } from './menus';
import { SELECT_PRODUCT } from './products';

export const HANDLE_MODAL = createAction('HANDLE_MODAL');

export const initialState = I.from({
  createMenuModal     : false,
  createProductModal  : false,
  orderDetailModal    : false,
  editMenuModal       : false,
  editProducModal     : false,
  confirmModal        : false,
  storeModal          : false,
});

export function handleModal (modal, data, type) {
  return (dispatch) => {
    dispatch(HANDLE_MODAL(modal));
    if (data) {
      if (type === 'menu') {
        dispatch(SELECT_MENU(data))
      }
      if (type === 'product') {
        dispatch(SELECT_PRODUCT(data))
      }
    }
  }
}

export default handleActions({
  HANDLE_MODAL : (state, action) => {
    return I.setIn(state, [action.payload], !state[action.payload]);
  },
}, initialState)