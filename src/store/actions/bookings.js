import axios from 'axios'
import { apiUrl, getAuth } from './utils'
import * as type from '../reducers/types'

export const fetchRequests = (
  code,
  from = 0,
  to = 20,
  closed = false
) => async dispatch => {
  const counter = async () =>
    await axios
      .get(
        `https://api.acanalmaule.cl/event-books/count?type=requestforattention&closed=${closed}`,
        getAuth()
      )
      .then(({ data }) => data)

  const url = code
    ? `${apiUrl}/event-books?type=requestforattention&irrigator_code=${code}&closed=${closed}&_start=${from}&_limit=${to}&_sort=published_at:desc`
    : `${apiUrl}/event-books?type=requestforattention&_start=${from}&closed=${closed}&_limit=${to}&_sort=published_at:desc`

  dispatch({ type: type.LOADING, load: true })
  const count = await counter()
  return axios
    .get(url, getAuth())
    .then(({ data }) => {
      dispatch({
        type: closed ? type.FETCH_CLOSED_REQUESTS : type.FETCH_REQUESTS,
        requests: data,
        count: count
      })
      dispatch({ type: type.LOADING, load: false })
    })
    .catch(err => dispatch({ type: type.ERROR, error: err }))
}

export const getRoles = () => async dispatch => {
  const url = `${apiUrl}/association-areas`
  dispatch({ type: type.LOADING, load: true })

  return axios
    .get(url, getAuth())
    .then(({ data }) => {
      dispatch({
        type: type.GET_ROLES,
        roles: data
      })
      dispatch({ type: type.LOADING, load: false })
    })
    .catch(err => dispatch({ type: type.ERROR, error: err }))
}

export const createRequest = form => async dispatch => {
  const url = `${apiUrl}/event-books`
  dispatch({ type: type.LOADING, load: true })
  return axios
    .post(url, form, getAuth())
    .then(({ data }) => {
      dispatch({
        type: type.POST_REQUEST,
        request: data
      })
      dispatch({ type: type.LOADING, load: false })
      dispatch({
        type: type.NOTIFICATIONS,
        notification: { message: 'solicitud enviada con exito' }
      })
    })
    .catch(err => {
      dispatch({ type: type.ERROR, error: err })
      dispatch({ type: type.LOADING, load: false })
    })
}
