import { removeDuplicates } from '../../components/hoc/utils'
import * as types from './types'

export const reports = (state = { data: [] }, action) => {
  let newState = []

  if (state.data.length > 0 && action.reports?.data.length > 0) {
    newState = [...state.data, ...action.reports.data]
    newState = removeDuplicates(newState, item => item.id)
  } else {
    newState = action.reports?.data
  }

  switch (action.type) {
    case types.GET_VISIT_REPORTS:
      return {
        ...state,
        count: action.reports?.count,
        data: newState
      }
    case types.LOADING_REPORTS:
      return {
        ...state,
        loading: action.loading
      }

    default:
      return state
  }
}

export const binnacles = (state = { data: [] }, action) => {
  let newState = []

  if (state.data.length > 0 && action.binnacles?.data.length > 0) {
    newState = [...state.data, ...action.binnacles?.data]
    newState = removeDuplicates(newState, item => item.id)
  } else {
    newState = action.binnacles?.data
  }

  switch (action.type) {
    case types.GET_CHANNEL_REPORTS:
      return {
        ...state,
        count: action.binnacles?.count,
        data: newState
      }
    case types.LOADING_BINNACLES:
      return {
        ...state,
        loading: action.loading
      }

    default:
      return state
  }
}
