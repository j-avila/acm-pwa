import axios from 'axios'
import * as type from '../reducers/types'
import { apiUrl, getAuth } from './utils'

export const fetchDashboard = code => async dispatch => {
  console.log(code)
  const url = `${apiUrl}/dashboard-irrigators/${code}?_sort=createdAt:desc`

  dispatch({ type: type.LOADING, load: true })
  return axios
    .get(url, getAuth())
    .then(({ data }) => {
      dispatch({
        type: type.FETCH_DASHBOARD,
        dash: data
      })
      dispatch({ type: type.LOADING, load: false })
    })
    .catch(err => {
      dispatch({ type: type.LOADING, load: false })
      dispatch({ type: type.ERROR, error: err })
    })
}
