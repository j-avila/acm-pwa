import axios from 'axios'
import * as type from '../reducers/types'
import { apiUrl, getAuth } from './utils'

export const getIrrigatorDetails = code => async dispatch => {
  const url = `${apiUrl}/irrigators?code=${code}`
  dispatch({ type: type.LOADING, load: true })
  return axios
    .get(url, getAuth())
    .then(({ data }) => {
      dispatch({
        type: type.GET_IRRIGATOR,
        detail: data[0]
      })
      dispatch({ type: type.LOADING, load: false })
    })
    .catch(err => {
      dispatch({ type: type.LOADING, load: false })
      dispatch({ type: type.ERROR, error: err })
    })
}
