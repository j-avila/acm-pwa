import * as types from './types'

export const reports = (reports = {}, action) => {
  switch (action.type) {
    case types.GET_REPORTS:
      return action.reports

    default:
      return reports
  }
}
