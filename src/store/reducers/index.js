import { combineReducers } from 'redux'
import * as types from './types'
import { requests } from './requests'
import { editProfile } from './editProfile'
import { login } from './login'
import { information } from './information'

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

const notifications = (state = {}, action) => {
  switch (action.type) {
    case types.NOTIFICATIONS:
      return {
        ...state,
        notificacions: action.notification
      }
    default:
      return state
  }
}

export default combineReducers({
  errors,
  notifications,
  login,
  editProfile,
  information,
  requests
})
