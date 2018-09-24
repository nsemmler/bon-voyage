import { applyMiddleware, createStore } from 'redux'
import rootReducer from  './reducers'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

export default (initialState) => {
  return createStore(rootReducer, applyMiddleware(thunk, logger))
}




// store = {
//   isLoading: false,
//   showLoginError: false,
//   showSignupError: false,
//   user: {},
//   curr_question_id: 0,
//   curr_question: "",
//   curr_question_options: [],
//   users_answers: {}
// }
