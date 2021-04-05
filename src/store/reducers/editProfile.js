import * as types from './types'

export const editProfile = (profile = {}, action) => {
  switch (action.type) {
    case types.FETCH_PROFILE:
      return {
        profile: action.profile
      }
    case types.PROFILE_FORM:
      return {
        form: action.form
      }
    case types.EDIT_SETTINGS:
      return {
        settings: action.settings
      }

    default:
      return profile
  }
}
