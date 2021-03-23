import axios from 'axios'
import * as type from '../reducers/types'
import { apiUrl, getAuth } from './utils'

export const editProfile = form => async dispatch => {
  const url = `${apiUrl}/create-irrigator-profiles`

  return axios
    .post(url, form, getAuth())
    .then(({ data }) => {
      dispatch({
        type: type.EDIT_PROFILE,
        profile: data
      })
      dispatch({ type: type.NOTIFICATIONS, notification: 'guardado con exito' })
    })
    .catch(err => dispatch({ type: type.ERROR, error: err }))
}
