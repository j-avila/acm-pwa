import * as types from './types'

export const login = (session = {}, action) => {
  switch (action.type) {
    case types.LOGIN_FORM:
      return {
        ...session,
        session: action.form
      }

    default:
      return {
        session
      }
  }
}
