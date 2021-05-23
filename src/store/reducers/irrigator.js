import * as types from './types'

export const irrigator = (user = {}, action) => {
  switch (action.type) {
    case types.GET_IRRIGATOR:
      return {
        detail: action.detail
      }
    case types.GET_HISTORY:
      return {
        history: action.history
      }
    default:
      return user
  }
}
