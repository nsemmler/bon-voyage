import { applyMiddleware, createStore } from 'redux'
import rootReducer from  './reducers'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

export default (initialState) => {
  return createStore(rootReducer, applyMiddleware(thunk, logger))
}
