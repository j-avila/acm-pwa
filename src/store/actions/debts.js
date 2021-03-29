import axios from 'axios'
import * as type from '../reducers/types'
import { apiUrl, getAuth } from './utils'

export const getDebts = code => async dispatch => {
  const url = `${apiUrl}/irrigator-fees?code=${code}`
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
  const url = `${apiUrl}/irrigator-fees-paids?code=${code}`
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
