import { removeDuplicates } from '../../components/hoc/utils'
import * as types from './types'

export const irrigators = (state = { data: [] }, action) => {
  switch (action.type) {
    case types.GET_IRRIGATORS_LIST:
      let newitems = action.irrigators
      let list = [...state.data, ...newitems]
      let filtered = removeDuplicates(list, item => item.id)
      return {
        ...state,
        count: action.count,
        data: filtered
      }

    default:
      return state
  }
}
