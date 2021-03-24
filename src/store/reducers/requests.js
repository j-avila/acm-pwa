import * as types from './types'

export const requests = (requests = [], action) => {
  switch (action.type) {
    case types.FETCH_REQUESTS:
      return {
        open: action.requests
      }
    case types.REQUEST_FORM:
      return {
        form: action.form
      }
    case types.GET_ROLES:
      return {
        ...requests,
        roles: [...action.roles]
      }

    default:
      return {
        requests
      }
  }
}
