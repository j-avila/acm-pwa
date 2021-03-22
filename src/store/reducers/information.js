import * as types from './types'

export const information = (infoChannels = {}, action) => {
  switch (action.type) {
    case types.GET_INFOCARDS:
      return {
        infoCards: action.infoCards
      }

    default:
      return infoChannels
  }
}
