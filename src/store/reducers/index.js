import { combineReducers } from 'redux'
import * as types from './types'
import { requests } from './requests'
import { login } from './login'
import { information } from './information'
import { user } from './user'
import { debts } from './debts'
import { dashboard } from './dashboard'
import { visits } from './visits'
import { irrigator } from './irrigator'
import { irrigators } from './irrigators'
import { reports } from './reports'
import { watchmans } from './watchmans'

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

const banksInfo = (state = [], action) => {
  switch (action.type) {
    case types.GET_BANKS:
      return action.banks
    default:
      return state
  }
}

const channelsList = (state = [], action) => {
  switch (action.type) {
    case types.GET_CHANNELS:
      return action.channels
    default:
      return state
  }
}

export const codeActive = (code = null, action) => {
  switch (action.type) {
    case types.SET_CODE:
      return action.code
    default:
      return code
  }
}

export const recurrentIssues = (issues = [], action) => {
  switch (action.type) {
    case types.SET_ISSUES:
      return action.issues
    default:
      return issues
  }
}

export default combineReducers({
  loading,
  banksInfo,
  channelsList,
  errors,
  notifications,
  login,
  user,
  dashboard,
  information,
  requests,
  debts,
  visits,
  codeActive,
  irrigator,
  reports,
  recurrentIssues,
  irrigators,
  watchmans
})
