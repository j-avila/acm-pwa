import axios from 'axios'
import moment from 'moment'
import * as type from '../reducers/types'
import { apiUrl, getAuth } from './utils'

export const fetchDashboard = (code, role) => async dispatch => {
  /* Ultima fecha de actualización de las deudas */
  let last_update_fees = ""
  await axios
  .get(`${apiUrl}/file-update-controls/last-update-fees`, getAuth())
  .then(({ data }) => last_update_fees = moment(data.createdAt).format('D MMM YYYY'))

  const url = code
    ? `${apiUrl}/dashboard-irrigators/${code}?_sort=createdAt:desc`
    : `${apiUrl}/dashboard-acmuser`

  const counter = async () =>
    await axios
      .get(`${apiUrl}/irrigators/count`, getAuth())
      .then(({ data }) => data)
  dispatch({ type: type.LOADING, load: true })
  const irrigatorsCount = code ? 0 : await counter()

  return axios
    .get(url, getAuth())
    .then(({ data }) => {
      dispatch({
        type: type.FETCH_DASHBOARD,
        dash: { ...data, counter: irrigatorsCount, last_update_fees }
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
  const url = `${apiUrl}/channels?_sort=name:asc&_limit=200`

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
