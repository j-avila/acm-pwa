import * as types from './types'

export const dashboard = (dash = {}, action) => {
  switch (action.type) {
    case types.FETCH_DASHBOARD:
      return action.dash
    default:
      return dash
  }
}
