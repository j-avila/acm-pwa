import axios from 'axios'
import { apiUrl, getAuth } from './utils'
import * as type from '../reducers/types'

export const fetchInfoCards = () => async dispatch => {
  const url = `${apiUrl}/event-bboks`

  return axios.get(url, getAuth()).then(({ data }) => {
    dispatch({
      type: type.FETCH_REQUESTS,
      requests: data
    })
  })
}
