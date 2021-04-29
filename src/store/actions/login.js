import axios from 'axios'
import * as type from '../reducers/types'
import { apiUrl, getAuth } from './utils'

export const loginHandler = form => async dispatch => {
  const url = `${apiUrl}/auth/local`
  return axios
    .post(url, form)
    .then(({ data }) => {
      const activeUser = JSON.stringify(data.user)
      localStorage.setItem('session', data.jwt)
      localStorage.setItem('userActive', activeUser)
      dispatch({
        type: type.LOGIN_FORM,
        form: data
      })
    })
    .catch(err => dispatch({ type: type.ERROR, error: err }))
}

export const userDataHandler = role => async dispatch => {
  // console.log(role)
  const url =
    role === 'irrigator' ? `${apiUrl}/irrigator-info` : `${apiUrl}/myinfo`
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
      dispatch({ type: type.LOADING, load: false })
      dispatch({ type: type.ERROR, error: err })
    })
}
