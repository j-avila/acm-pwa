import { removeDuplicates } from '../../components/hoc/utils'
import * as types from './types'

export const requests = (
  state = { open: { data: [] }, closed: { data: [] }, loading: false },
  action
) => {
  switch (action.type) {
    case types.LOADING_MESSAGE:
      return {
        ...state,
        loading: action.load
      }
    case types.FETCH_REQUESTS:
      let newitems = action.requests
      let openlist = [...state.open.data, ...newitems]
      let filtered = removeDuplicates(openlist, item => item.id)
      return {
        ...state,
        open: { count: action.count, data: filtered }
      }
    case types.FETCH_CLOSED_REQUESTS:
      let newcloseditems = action.requests
      let closedlist = [...state.closed.data, ...newcloseditems]
      let closedfiltered = removeDuplicates(closedlist, item => item.id)
      return {
        ...state,
        closed: {
          count: action.count,
          data: closedfiltered
        }
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
    case types.RESET_CHAT:
      return {
        ...state,
        details: {}
      }

    default:
      return state
  }
}
