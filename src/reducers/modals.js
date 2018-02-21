import I from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';

export const HANDLE_MODAL = createAction('HANDLE_MODAL');

export const initialState = I.from({
  createMenuModal : false,
  createBocaModal : false,
});

export function handleModal (modal) {
  return (dispatch) => {
    dispatch(HANDLE_MODAL(modal))
  }
}

export default handleActions({
  HANDLE_MODAL : (state, action) => {
    return I.setIn(state, [action.payload], !state[action.payload]);
  },
}, initialState)