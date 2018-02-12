import { createAction, handleActions } from 'redux-actions';

const INPUT_CHANGE = createAction('INPUT_CHANGE');

const initialState = {
  inputValue : '',
}

export const handleInput = (value) => {
  return dispatch => {
    dispatch(INPUT_CHANGE(value));
  }
}

export default handleActions({
  INPUT_CHANGE : (state, action) => {
    return {
      ...state,
      inputValue: action.payload,
    }
  }
}, initialState)