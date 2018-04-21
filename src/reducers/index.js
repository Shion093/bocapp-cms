import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// Reducers
import counter from './counter';
import menus from './menus';
import bocas from './bocas';
import modals from './modals';
import orders from './orders';
import auth from './auth';

export default combineReducers({
  routing : routerReducer,
  counter,
  menus,
  bocas,
  modals,
  orders,
  auth,
})