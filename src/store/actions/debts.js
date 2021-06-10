import axios from 'axios'
import * as type from '../reducers/types'
import { apiUrl, getAuth } from './utils'

export const getDebts = code => async dispatch => {
  const url = `${apiUrl}/irrigator-fees?code=${code}&_sort=expiration:asc&_start=0&_limit=20`
  dispatch({ type: type.LOADING, load: true })
  return axios
    .get(url, getAuth())
    .then(({ data }) => {
      dispatch({
        type: type.GET_DEBTS,
        debts: data
      })
      dispatch({ type: type.LOADING, load: false })
    })
    .catch(err => dispatch({ type: type.ERROR, error: err }))
}

export const getPayedDebts = code => async dispatch => {
  const url = `${apiUrl}/irrigator-fees-paids?code=${code}&_sort=expiration:desc`
  dispatch({ type: type.LOADING, load: true })
  return axios
    .get(url, getAuth())
    .then(({ data }) => {
      dispatch({
        type: type.GET_PAYED_DEBTS,
        payedDebts: data
      })
      dispatch({ type: type.LOADING, load: false })
    })
    .catch(err => dispatch({ type: type.ERROR, error: err }))
}

export const createDebtRequest = form => async dispatch => {
  const url = `${apiUrl}/event-books`
  dispatch({ type: type.LOADING, load: true })
  return axios
    .post(url, form, getAuth())
    .then(({ data }) => {
      dispatch({
        type: type.POST_REQUEST,
        requests: data
      })
      dispatch({ type: type.LOADING, load: false })
      dispatch({
        type: type.NOTIFICATIONS,
        notification: { message: 'solicitud enviada con exito' }
      })
    })
    .catch(err => {
      dispatch({ type: type.ERROR, error: err })
      dispatch({ type: type.LOADING, load: false })
    })
}

export const sendPay = form => async dispatch => {
  const formdata = new FormData()
  const url = `${apiUrl}/irrigator-payments-reporteds`

  form.attachment &&
    formdata.append('files.attached', form.attachment, form.attachment.name)
  form.data && formdata.append('data', JSON.stringify(form.data))

  console.log('form to send:', JSON.stringify(form))

  return axios
    .post(url, formdata, getAuth())
    .then(({ data }) => {
      console.log(data)
      dispatch({
        type: type.NOTIFICATIONS,
        notification: { message: '¡Pago enviado con exito!' }
      })
    })
    .catch(err => dispatch({ type: type.ERROR, error: err }))
}
