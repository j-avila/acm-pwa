import * as types from './types'

export const watchmans = (watchmans = {}, action) => {
  switch (action.type) {
    case types.GET_WATCHMEN_LIST:
      return action.watchmans
    default:
      return watchmans
  }
}
