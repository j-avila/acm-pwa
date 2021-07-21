import axios from 'axios'
import * as type from '../reducers/types'
import { apiUrl, getAuth } from './utils'

export const createProfile = (form, role) => async dispatch => {
  const url =
    role === 'irrigator'
      ? `${apiUrl}/create-irrigator-profiles`
      : `${apiUrl}/update-acmuser-profiles`
  const roleAction = role === 'irrigator' ? 'post' : 'put'

  dispatch({ type: type.LOADING, load: true })
  return axios[roleAction](url, form, getAuth())
    .then(({ data }) => {
      dispatch({
        type: type.EDIT_PROFILE,
        user: data
      })
      dispatch({ type: type.LOADING, load: false })
      dispatch({
        type: type.NOTIFICATIONS,
        notification: { message: 'guardado con exito' }
      })
    })
    .catch(err => dispatch({ type: type.ERROR, error: err }))
}

export const editProfile = form => async dispatch => {
  const url = `${apiUrl}/update-irrigator-profiles`

  return axios
    .put(url, form, getAuth())
    .then(({ data }) => {
      dispatch({
        type: type.EDIT_PROFILE,
        profile: data
      })
      dispatch({
        type: type.NOTIFICATIONS,
        notification: { message: 'guardado con exito' }
      })
    })
    .catch(err => dispatch({ type: type.ERROR, error: err }))
}
