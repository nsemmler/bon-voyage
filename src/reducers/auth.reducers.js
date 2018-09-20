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
  showLoginError: false,
  showSignupError: false,
  user: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_PENDING:
      return { ...state, isLoading: true }
    case USER_LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.headers.authorization)
      return { ...state, isLoading: false, user: action.payload.data }
    case USER_LOGIN_FAILED:
      return { ...state, isLoading: false, showLoginError: true }
    case USER_SIGNUP_PENDING:
      return { ...state, isLoading: true }
    case USER_SIGNUP_SUCCESS:
      return { ...state, isLoading: false }
    case USER_SIGNUP_FAILED:
      return { ...state, isLoading: false, showSignupError: true }
    case USER_LOGOUT:
      localStorage.removeItem('token')
      return { ...state, isLoading: false }
    default:
      return state
  }
}
