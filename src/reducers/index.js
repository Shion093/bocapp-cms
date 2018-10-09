import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// Reducers
import counter from './counter';
import menus from './menus';
import products from './products';
import modals from './modals';
import orders from './orders';
import auth from './auth';
import store from './store';

export default combineReducers({
  routing : routerReducer,
  counter,
  menus,
  products,
  modals,
  orders,
  auth,
  store,
})