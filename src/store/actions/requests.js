import axios from 'axios'
import * as type from '../reducers/types'
import { apiUrl, getAuth } from './utils'

export const getChats = id => async dispatch => {
  const url = `${apiUrl}/get-messages/${id}`
  dispatch({ type: type.LOADING, load: true })
  return axios
    .get(url, getAuth())
    .then(({ data }) => {
      dispatch({
        type: type.GET_REQUEST_DETAILS,
        request: data
      })
      dispatch({ type: type.LOADING, load: false })
    })
    .catch(err => {
      dispatch({ type: type.ERROR, error: err })
      dispatch({ type: type.LOADING, load: false })
    })
}
