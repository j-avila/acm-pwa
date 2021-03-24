import axios from 'axios'
import { apiUrl, getAuth } from './utils'
import * as type from '../reducers/types'

export const fetchRequests = () => async dispatch => {
  const url = `${apiUrl}/event-books`

  return axios.get(url, getAuth()).then(({ data }) => {
    dispatch({
      type: type.FETCH_REQUESTS,
      requests: data
    })
  })
}

export const getRoles = () => async dispatch => {
  const url = `${apiUrl}/association-areas`

  return axios.get(url, getAuth()).then(({ data }) => {
    dispatch({
      type: type.GET_ROLES,
      roles: data
    })
  })
}

export const createRequest = form => async dispatch => {
  const url = `${apiUrl}/event-books`

  return axios.post(url, form, getAuth()).then(({ data }) => {
    dispatch({
      type: type.POST_REQUEST,
      requests: data
    })
  })
}
