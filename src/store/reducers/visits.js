import * as types from './types'

export const visits = (state = {}, action) => {
  switch (action.type) {
    case types.GET_VISITS:
      return {
        ...state,
        visitsListed: action.visits
      }
    case types.GET_VISITS_DETAILS:
      return {
        ...state,
        details: action.visit
      }
    case types.REQUEST_VISIT:
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
