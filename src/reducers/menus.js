import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';

export const MENU_CREATED = createAction('MENU_CREATED');
export const HANDLE_MENU_INPUT = createAction('HANDLE_MENU_INPUT');

export const initialState = I.from({
  create : {
    name        : '',
    description : '',
    picture     : 'https://img.buzzfeed.com/buzzfeed-static/static/2016-03/22/15/enhanced/webdr03/enhanced-2202-1458675262-19.png',
  },
  menus : [],
});

export function createMenu () {
  return (dispatch) => {

  }
}

export function handleMenuInputs () {
  return (dispatch) => {

  }
}


export default handleActions({
  MENU_CREATED : (state, action) => {
    return I.merge(state, action.payload);
  },
  HANDLE_MENU_INPUT : (state, action) => {
    return I.setIn(state, ['create', action.payload.key], action.payload.value);
  },
}, initialState)