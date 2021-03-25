import axios from 'axios'
import * as type from '../reducers/types'
import { apiUrl, getAuth } from './utils'

export const loginHandler = form => async dispatch => {
  const url = `${apiUrl}/auth/local`
  return axios
    .post(url, form)
    .then(({ data }) => {
      localStorage.setItem('session', data.jwt)
      dispatch({
        type: type.LOGIN_FORM,
        form: data
      })
    })
    .catch(err => dispatch({ type: type.ERROR, error: err }))
}

export const userDataHandler = form => async dispatch => {
  const url = `${apiUrl}/irrigator-info`
  dispatch({ type: type.LOADING, load: true })
  return axios
    .get(url, getAuth())
    .then(({ data }) => {
      dispatch({
        type: type.GET_USER,
        user: data
      })
      dispatch({ type: type.LOADING, load: false })
    })
    .catch(err => {
      dispatch({ type: type.ERROR, error: err })
      dispatch({ type: type.LOADING, load: false })
    })
}
