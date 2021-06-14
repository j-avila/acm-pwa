import axios from 'axios'
import * as type from '../reducers/types'
import { apiUrl, getAuth } from './utils'

export const fetchDashboard = (code, role) => async dispatch => {
  const url = code
    ? `${apiUrl}/dashboard-irrigators/${code}?_sort=createdAt:desc`
    : `${apiUrl}/dashboard-acmuser`

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

// get channels list
export const getChannels = () => async dispatch => {
  const url = `https://api.acanalmaule.cl/channels?_sort=name:asc&_limit=200`

  return axios
    .get(url, getAuth())
    .then(({ data }) => {
      dispatch({
        type: type.GET_CHANNELS,
        channels: data
      })
    })
    .catch(err => dispatch({ type: type.ERROR, error: err }))
}
