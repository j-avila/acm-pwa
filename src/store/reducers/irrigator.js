import * as types from './types'

export const irrigator = (user = {}, action) => {
  switch (action.type) {
    case types.GET_IRRIGATOR:
      return {
        detail: action.detail
      }
    default:
      return user
  }
}
