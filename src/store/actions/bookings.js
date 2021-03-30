import axios from 'axios'
import { apiUrl, getAuth } from './utils'
import * as type from '../reducers/types'

export const fetchRequests = () => async dispatch => {
  const url = `${apiUrl}/event-books`
  dispatch({ type: type.LOADING, load: true })
  return axios
    .get(url, getAuth())
    .then(({ data }) => {
      dispatch({
        type: type.FETCH_REQUESTS,
        requests: data
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
        requests: data
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
