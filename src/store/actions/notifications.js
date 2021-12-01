import axios from 'axios'
import * as types from '../reducers/types'
import { apiUrl, getAuth } from './utils'

export const setNotification = notForm => async dispatch => {
  dispatch({ type: types.LOADING_MESSAGE, load: true })
  return await axios
    .post(`${apiUrl}/notification-centers`, notForm, getAuth())
    .then(data => {
      dispatch({ type: types.LOADING_MESSAGE, load: false })
      dispatch({
        type: types.NOTIFICATIONS,
        notification: { message: 'Guardado con exito' }
      })
    })
    .catch(err => {
      dispatch({ type: types.LOADING_MESSAGE, load: false })
      dispatch({ type: types.ERROR, error: err })
    })
}
