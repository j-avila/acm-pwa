import axios from 'axios'
import * as type from '../reducers/types'
import { apiUrl, getAuth } from './utils'

export const createProfile = form => async dispatch => {
  const url = `${apiUrl}/create-irrigator-profiles`
  dispatch({ type: type.LOADING, load: true })
  return axios
    .post(url, form, getAuth())
    .then(({ data }) => {
      dispatch({
        type: type.EDIT_PROFILE,
        profile: data
      })
      dispatch({ type: type.LOADING, load: false })
      dispatch({ type: type.NOTIFICATIONS, notification: 'guardado con exito' })
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
      dispatch({ type: type.NOTIFICATIONS, notification: 'guardado con exito' })
    })
    .catch(err => dispatch({ type: type.ERROR, error: err }))
}
