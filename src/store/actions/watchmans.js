import axios from 'axios'
import { apiUrl, getAuth } from './utils'
import * as type from '../reducers/types'

export const fetchWatchmans = code => async dispatch => {
  const url = `${apiUrl}/watchman-list`

  return axios.get(url, getAuth()).then(({ data }) => {
    dispatch({
      type: type.GET_WATCHMEN_LIST,
      watchmans: data
    })
  })
}
