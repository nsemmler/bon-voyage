import axios from 'axios'
import { clearFavorites } from './form.actions.js'

export const USER_LOGIN_PENDING = "USER_LOGIN_PENDING"
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS"
export const USER_LOGIN_FAILED = "USER_LOGIN_FAILED"
export const USER_SIGNUP_PENDING = "USER_SIGNUP_PENDING"
export const USER_SIGNUP_SUCCESS = "USER_SIGNUP_SUCCESS"
export const USER_SIGNUP_FAILED = "USER_SIGNUP_FAILED"
export const USER_LOGOUT = "USER_LOGOUT"

window.axios = axios

const BASE_URL = "http://localhost:3000"
// const BASE_URL = "https://bon-voyage-api.herokuapp.com"

export const userLogin = ({ email, password }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_PENDING })
      let response = await axios.post(`${BASE_URL}/login`, { 'user': { 'email': email, 'password': password } })
      localStorage.setItem('token', response.headers.authorization)
      localStorage.setItem('userId', response.data.id)
      dispatch({ type: USER_LOGIN_SUCCESS, payload: response })
    } catch (err) {
      dispatch({ type: USER_LOGIN_FAILED, payload: err })
    }
  }
}

export const userSignup = (newUser) => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_SIGNUP_PENDING })
      let response = await axios.post(`${BASE_URL}/signup`, { 'user': { 'email': newUser.email, 'password': newUser.password } })
      dispatch({ type: USER_SIGNUP_SUCCESS, payload: response.data })
    } catch (err) {
      dispatch({ type: USER_SIGNUP_FAILED, payload: err })
    }
  }
}

export const userLogout = () => {
  return async (dispatch) => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    dispatch(clearFavorites())
    dispatch({ type: USER_LOGOUT })
  }
}
