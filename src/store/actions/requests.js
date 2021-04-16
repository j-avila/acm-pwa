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
  const formdata = new FormData()
  const url = `${apiUrl}/event-book-messages?event_book=${form.data.event_book}`
  console.log('form to send:', form)

  form.file && formdata.append('files.attached', form.file, form.file.name)
  form.data && formdata.append('data', JSON.stringify(form.data))

  return axios
    .post(url, formdata, getAuth())
    .then(({ data }) => {
      // console.log(data)
      socket.emit('message:chat', data)
      dispatch({
        type: type.REQUEST_FORM,
        message: data
      })
    })
    .catch(err => dispatch({ type: type.ERROR, error: err }))
}
