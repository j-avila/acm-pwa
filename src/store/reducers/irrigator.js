import * as types from './types'

export const irrigator = (irrigator = {}, action) => {
  switch (action.type) {
    case types.GET_IRRIGATOR:
      return {
        ...irrigator,
        detail: action.detail
      }
    case types.GET_HISTORY:
      return {
        ...irrigator,
        history: action.history
      }
    default:
      return irrigator
  }
}
