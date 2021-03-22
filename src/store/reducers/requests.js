import * as types from './types'

export const requests = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_REQUESTS:
      return {
        ...state,
        requests: { ...action.requests }
      }
    case types.REQUEST_FORM:
      return {
        ...state,
        form: action.form
      }

    default:
      return {
        state
      }
  }
}
