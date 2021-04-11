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
  // const formdata = new FormData()
  // formdata.append('file.attached', form.attached, form.attached.name)
  const url = `${apiUrl}/event-book-messages?event_book=${form.event_book}`
  console.log('form to send:', form.attached)

  const dataForm = genData(form)

  return axios
    .post(url, dataForm, getAuth())
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

let genData = formData => {
  let formPayLoad = new FormData()
  for (let [key, value] of Object.entries(formData)) {
    if (key === 'attached') {
      typeof value === 'object' &&
        formPayLoad.append('file.attached', value.url, value.name)
    } else {
      let valueFormat =
        typeof value === 'object' ? JSON.stringify(value) : value
      formPayLoad.append(`message[${key}]`, valueFormat)
    }
  }
  return formPayLoad
}
