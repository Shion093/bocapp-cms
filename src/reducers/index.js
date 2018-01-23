import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// Reducers
import counter from './counter';

export default combineReducers({
  routing : routerReducer,
  counter,
})