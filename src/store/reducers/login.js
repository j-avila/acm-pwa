import * as types from './types'

export const login = (session = {}, action) => {
  switch (action.type) {
    case types.LOGIN_FORM:
      return action.form

    default:
      return session
  }
}
