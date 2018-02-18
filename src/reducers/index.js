import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// Reducers
import counter from './counter';
import input from './input';
import menus from './menus';
import modals from './modals';

export default combineReducers({
  routing : routerReducer,
  input,
  counter,
  menus,
  modals,
})