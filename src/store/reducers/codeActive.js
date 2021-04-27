import * as types from './types'

export const codeActive = (code = {}, action) => {
  switch (action.type) {
    case types.SET_CODE:
      return action.codeActive
    default:
      return code
  }
}
