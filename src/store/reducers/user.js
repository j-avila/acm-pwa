import * as types from './types'

export const user = (user = {}, action) => {
  switch (action.type) {
    case types.GET_USER:
      return action.user
    case types.EDIT_PROFILE:
      return {
        ...user,
        profile: action.profile
      }
    case types.SET_CODE:
      return {
        ...user,
        codeActive: action.codeActive
      }
    default:
      return user
  }
}
