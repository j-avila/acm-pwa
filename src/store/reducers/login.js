import * as types from './types'

export const login = (session = {}, action) => {
  switch (action.type) {
    case types.LOGIN_FORM:
      return {
        session: action.form
      }
    case types.GET_USER:
      return {
        ...session,
        user: action.user
      }

    default:
      return {
        session
      }
  }
}
