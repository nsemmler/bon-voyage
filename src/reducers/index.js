import auth from './auth.reducers'
import form from './form.reducers'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({ auth, form })

export default rootReducer
