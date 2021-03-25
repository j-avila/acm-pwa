import * as types from './types'

export const requests = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_REQUESTS:
      return {
        ...state,
        open: action.requests
      }
    case types.GET_REQUEST_DETAILS:
      return {
        ...state,
        details: action.request
      }
    case types.REQUEST_FORM:
      return {
        ...state,
        form: action.form
      }
    case types.GET_ROLES:
      return {
        ...state,
        roles: action.roles
      }

    default:
      return state
  }
}
