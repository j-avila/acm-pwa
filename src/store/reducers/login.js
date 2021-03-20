import * as types from './types'

export const login = (user = [], action) => {
  switch (action.type) {
    case types.LOGIN_FORM:
      return {
        ...user,
        user: action.form
      }

    default:
      return {
        user
      }
  }
}
