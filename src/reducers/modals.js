import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';

// Actions
import { SELECT_MENU } from './menus';
import { SELECT_BOCA } from './bocas';

export const HANDLE_MODAL = createAction('HANDLE_MODAL');

export const initialState = I.from({
  createMenuModal  : false,
  createBocaModal  : false,
  orderDetailModal : false,
  editMenuModal    : false,
  editBocaModal    : false,
});

export function handleModal (modal, data, type) {
  return (dispatch) => {
    dispatch(HANDLE_MODAL(modal));
    if (data) {
      if (type === 'menu') {
        dispatch(SELECT_MENU(data))
      }
      if (type === 'boca') {
        dispatch(SELECT_BOCA(data))
      }
    }
  }
}

export default handleActions({
  HANDLE_MODAL : (state, action) => {
    return I.setIn(state, [action.payload], !state[action.payload]);
  },
}, initialState)