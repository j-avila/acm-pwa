import { combineReducers } from 'redux'
import * as types from './types'
import { requests } from './requests'
import { editProfile } from './editProfile'
import { login } from './login'

const errors = (state = {}, action) => {
  switch (action.type) {
    case types.ERROR:
      return {
        errors: action.error
      }
    default:
      return state
  }
}

export default combineReducers({
  errors,
  login,
  editProfile,
  requests
})
