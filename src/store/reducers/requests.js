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
      let updated = action.message
      return {
        ...state,
        details: {
          ...state.details,
          messages: [...state.details.messages, updated]
        }
      }
    case types.GET_ROLES:
      return {
        ...state,
        roles: action.roles
      }
    case types.POST_REQUEST:
      return {
        ...state,
        requestDetail: action.request
      }

    default:
      return state
  }
}
