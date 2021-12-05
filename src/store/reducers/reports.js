import * as types from './types'

export const reports = (state = { reports: [], binnacles: [] }, action) => {
  let newReports = action.reports
  if (state.reports.length > 0 && action.reports.reports) {
    newReports = {
      ...newReports,
      reports: [...state.reports, ...action.reports.reports]
    }
  }
  if (state.binnacles.length > 0 && action.reports.binnacles) {
    newReports = {
      ...newReports,
      binnacles: [...state.binnacles, ...action.reports.binnacles]
    }
  }

  switch (action.type) {
    case types.GET_REPORTS:
      return newReports
    case types.GET_VISIT_REPORTS:
      return {
        ...state,
        reports: [...state.reports, ...action.reports.reports]
      }
    case types.GET_CHANNEL_REPORTS:
      return {
        ...state,
        binnacles: [...state.binnacles, ...action.reports.binnacles]
      }

    default:
      return state
  }
}
