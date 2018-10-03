import {
  USER_LOGIN_PENDING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_SIGNUP_PENDING,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILED,
  USER_LOGOUT
} from "../actions/auth.actions"

let initialState = {
  isLoading: false,
  isLoggedIn: false,
  showLoginError: false,
  showSignupError: false,
  user: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_PENDING:
      return { ...state, isLoading: true }
    case USER_LOGIN_SUCCESS:
      return { ...state, isLoading: false, isLoggedIn: true, showLoginError: false, user: action.payload.data }
    case USER_LOGIN_FAILED:
      return { ...state, isLoading: false, isLoggedIn: false, showLoginError: true, user: {} }
    case USER_SIGNUP_PENDING:
      return { ...state, isLoading: true }
    case USER_SIGNUP_SUCCESS:
      return { ...state, isLoading: false }
    case USER_SIGNUP_FAILED:
      return { ...state, isLoading: false, showSignupError: true }
    case USER_LOGOUT:
      return { ...state, isLoading: false, isLoggedIn: false, user: {} }
    default:
      return state
  }
}
