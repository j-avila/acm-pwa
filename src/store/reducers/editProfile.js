import * as types from './types'

export const editProfile = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_PROFILE:
      return {
        ...state,
        profile: action.profile
      }
    case types.PROFILE_FORM:
      return {
        ...state,
        form: action.form
      }

    default:
      return state
  }
}
