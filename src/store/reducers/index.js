import { combineReducers } from 'redux'
import * as types from './types'
import { requests } from './requests'
import { editProfile } from './editProfile'
import { login } from './login'
import { information } from './information'
import { user } from './user'
import { debts } from './debts'

const errors = (state = {}, action) => {
  switch (action.type) {
    case types.ERROR:
      return action.error
    default:
      return state
  }
}

const loading = (state = null, action) => {
  switch (action.type) {
    case types.LOADING:
      return action.load
    default:
      return state
  }
}

const notifications = (state = {}, action) => {
  switch (action.type) {
    case types.NOTIFICATIONS:
      return action.notification
    default:
      return state
  }
}

export default combineReducers({
  loading,
  errors,
  notifications,
  login,
  user,
  editProfile,
  information,
  requests,
  debts
})
