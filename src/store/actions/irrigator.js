import axios from 'axios'
import * as type from '../reducers/types'
import { apiUrl, getAuth } from './utils'

export const getIrrigatorsList = (
  from = 0,
  to = 20,
  param,
  channel
) => async dispatch => {
  const channelparam = `$&channel=${channel}`
  const nameparam = `&_where[_or][0][code_contains]=${param}&_where[_or][1][name_contains]=${param}`
  const url = `https://api.acanalmaule.cl/irrigators?_sort=name:asc&_start=${from}&_limit=${to}${
    channel ? channelparam : ''
  }${param ? nameparam : ''}`

  const counter = async () =>
    await axios
      .get(`https://api.acanalmaule.cl/irrigators/count`, getAuth())
      .then(({ data }) => data)

  dispatch({ type: type.LOADING, load: true })
  const count = await counter()
  return axios
    .get(url, getAuth())
    .then(({ data }) => {
      dispatch({
        type: type.GET_IRRIGATORS_LIST,
        irrigators: data,
        count: count
      })
      dispatch({ type: type.LOADING, load: false })
    })
    .catch(err => {
      dispatch({ type: type.LOADING, load: false })
      dispatch({ type: type.ERROR, error: err })
    })
}

export const filterIrrigatorsList = (
  from = 0,
  to = 20,
  param,
  channel
) => async dispatch => {
  const channelparam = `$&channel=${channel}`
  const nameparam = `&_where[_or][0][code_contains]=${param}&_where[_or][1][name_contains]=${param}`
  const url = `https://api.acanalmaule.cl/irrigators?_sort=name:asc&_start=${from}&_limit=${to}${
    channel ? channelparam : ''
  }${param ? nameparam : ''}`

  const counter = async () =>
    await axios
      .get(`https://api.acanalmaule.cl/irrigators/count`, getAuth())
      .then(({ data }) => data)

  dispatch({ type: type.LOADING, load: true })
  const count = await counter()
  return axios
    .get(url, getAuth())
    .then(({ data }) => {
      dispatch({
        type: type.FILTER_IRRIGATORS_LIST,
        irrigators: data,
        count: count
      })
      dispatch({ type: type.LOADING, load: false })
    })
    .catch(err => {
      dispatch({ type: type.LOADING, load: false })
      dispatch({ type: type.ERROR, error: err })
    })
}

export const getIrrigatorDetails = code => async dispatch => {
  const url = `${apiUrl}/irrigators?code=${code}`
  dispatch({ type: type.LOADING, load: true })
  return axios
    .get(url, getAuth())
    .then(({ data }) => {
      dispatch({
        type: type.GET_IRRIGATOR,
        detail: data[0]
      })
      dispatch({ type: type.LOADING, load: false })
    })
    .catch(err => {
      dispatch({ type: type.LOADING, load: false })
      dispatch({ type: type.ERROR, error: err })
    })
}

export const updateCoords = (id, coords) => async dispatch => {
  const url = `${apiUrl}/irrigator-profiles/${id}`

  return axios
    .put(url, coords, getAuth())
    .then(({ data }) => {
      console.log(data)
    })
    .catch(err => {
      dispatch({ type: type.LOADING, load: false })
      dispatch({ type: type.ERROR, error: err })
    })
}

export const getHistory = code => async dispatch => {
  const url = `${apiUrl}/event-books?type=annotation&irrigator_code=${code}`
  axios
    .get(url, getAuth())
    .then(({ data }) => {
      console.log(data)
      dispatch({ type: type.GET_HISTORY, history: data })
    })
    .catch(err => {
      dispatch({ type: type.ERROR, error: err })
    })
}
