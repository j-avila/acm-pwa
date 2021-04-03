import axios from 'axios'
import { socket } from '../../components/hoc/utils'
import * as type from '../reducers/types'
import { apiUrl, getAuth } from './utils'

export const getChats = id => async dispatch => {
  const url = `${apiUrl}/get-messages/${id}`
  dispatch({ type: type.LOADING, load: true })
  return axios
    .get(url, getAuth())
    .then(({ data }) => {
      dispatch({
        type: type.GET_REQUEST_DETAILS,
        request: data
      })
      dispatch({ type: type.LOADING, load: false })
    })
    .catch(err => {
      dispatch({ type: type.ERROR, error: err })
      dispatch({ type: type.LOADING, load: false })
    })
}

export const setMessage = form => async dispatch => {
  const url = `${apiUrl}/event-book-messages?event_book=${form.event_book}`

  return axios.post(url, form, getAuth()).then(({ data }) => {
    socket.emit('message:chat', data)
  })
}
