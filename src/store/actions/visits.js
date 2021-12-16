import axios from 'axios'
import { apiUrl, getAuth } from './utils'
import * as type from '../reducers/types'

export const fetchVisits = code => async dispatch => {
  const url = code
    ? `${apiUrl}/event-books?type=visitreport&_sort=createdAt:desc&irrigator_code=${code}`
    : `${apiUrl}/event-books?type=visitreport&_sort=createdAt:desc`
  //dispatch({ type: type.LOADING, loading: true })
  return axios
    .get(url, getAuth())
    .then(({ data }) => {
      dispatch({
        type: type.GET_VISITS,
        visits: data
      })
      //dispatch({ type: type.LOADING, loading: false })
    })
    .catch(err => dispatch({ type: type.ERROR, error: err }))
}
const counter = async type =>
  await axios
    .get(`${apiUrl}/event-books/count?type=${type}`, getAuth())
    .then(({ data }) => data)

export const fetchReports = (
  pagestart = 0,
  reqType = undefined
) => async dispatch => {
  /* Llamada a los reportes de visita */
  const getReports = async () => {
    const reports = await axios.get(
      `${apiUrl}/event-books?type=visitreport&_sort=createdAt:desc&_start=${pagestart}&_limit=20`,
      getAuth()
    )

    dispatch({ type: type.LOADING_REPORTS, loading: true })

    const vCount = await counter('visitreport')

    dispatch({
      type: type.GET_VISIT_REPORTS,
      reports: {
        total: vCount,
        data: reports.data
      }
    })
    dispatch({ type: type.LOADING_REPORTS, loading: false })
  }

  /* Llamada a los reportes de canal */
  const getBinnacles = async () => {
    const binnacles = await axios.get(
      `${apiUrl}/event-books?type=channelreport&_sort=createdAt:desc&_start=${pagestart}&_limit=20`,
      getAuth()
    )

    dispatch({ type: type.LOADING_REPORTS, loading: true })
    const bCount = await counter('channelreport')

    dispatch({
      type: type.GET_CHANNEL_REPORTS,
      binnacles: {
        total: bCount,
        data: binnacles.data
      }
    })
    dispatch({ type: type.LOADING_REPORTS, loading: false })
  }

  switch (reqType) {
    case 'visits':
      getReports()
      break
    case 'channels':
      getBinnacles()
      break
    default:
      getReports()
      getBinnacles()
      break
  }
}

export const fetchVisit = id => async dispatch => {
  const url = `${apiUrl}/event-books/${id}`
  return axios
    .get(url, getAuth())
    .then(({ data }) => {
      dispatch({
        type: type.GET_VISITS_DETAILS,
        visit: data
      })
    })
    .catch(err => dispatch({ type: type.ERROR, error: err }))
}

export const getBio = id => async dispatch => {
  /* Pr */
  const url = `${apiUrl}/get-messages/${id}`
  return axios
    .get(url, getAuth())
    .then(({ data }) => {
      dispatch({
        type: type.GET_VISIT_BIO,
        messages: data
      })
    })
    .catch(err => {
      dispatch({ type: type.ERROR, error: err })
      dispatch({ type: type.LOADING, loading: false })
    })
}

export const getRoles = () => async dispatch => {
  const url = `${apiUrl}/association-areas`
  dispatch({ type: type.LOADING, loading: true })

  return axios
    .get(url, getAuth())
    .then(({ data }) => {
      dispatch({
        type: type.GET_ROLES,
        roles: data
      })
      dispatch({ type: type.LOADING, loading: false })
    })
    .catch(err => dispatch({ type: type.ERROR, error: err }))
}

export const createVisitRequest = form => async dispatch => {
  const url = `${apiUrl}/event-books`
  dispatch({ type: type.LOADING, loading: true })
  return axios
    .post(url, form, getAuth())
    .then(({ data }) => {
      dispatch({
        type: type.REQUEST_VISIT,
        vistisRequest: data
      })
      dispatch({ type: type.LOADING, loading: false })
      dispatch({
        type: type.NOTIFICATIONS,
        notification: { message: 'Solicitud enviada con éxito.' }
      })
    })
    .catch(err => {
      dispatch({ type: type.ERROR, error: err })
      dispatch({ type: type.LOADING, loading: false })
    })
}
