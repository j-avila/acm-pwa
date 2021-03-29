import * as types from './types'

export const user = (user = {}, action) => {
  switch (action.type) {
    case types.GET_USER:
      return action.user

    default:
      return user
  }
}
