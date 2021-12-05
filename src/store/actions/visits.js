import axios from 'axios'
import { apiUrl, getAuth } from './utils'
import * as type from '../reducers/types'

export const fetchVisits = code => async dispatch => {
  const url = code
    ? `${apiUrl}/event-books?type=visitreport&irrigator_code=${code}`
    : `${apiUrl}/event-books?type=visitreport`
  dispatch({ type: type.LOADING, load: true })
  return axios
    .get(url, getAuth())
    .then(({ data }) => {
      dispatch({
        type: type.GET_VISITS,
        visits: data
      })
      dispatch({ type: type.LOADING, load: false })
    })
    .catch(err => dispatch({ type: type.ERROR, error: err }))
}

export const fetchReports = (
  pagestart = 0,
  pagelimit = 20,
  reqType = undefined
) => async dispatch => {
  const counter = async type =>
    await axios
      .get(`${apiUrl}/event-books/count?type=${type}`, getAuth())
      .then(({ data }) => data)

  const reports = await axios.get(
    `${apiUrl}/event-books?type=visitreport&_sort=published_at:desc&_start=${pagestart}&_limit=${pagelimit}`,
    getAuth()
  )
  const binnacles = await axios.get(
    `${apiUrl}/event-books?type=channelreport&_sort=name:asc,code:asc&_start=${pagestart}&_limit=${pagelimit}`,
    getAuth()
  )

  const getall = async () => {
    await axios.all([reports, binnacles], getAuth()).then(
      axios.spread(async (...resp) => {
        const vCount = await counter('visitreport')
        const bCount = await counter('channelreport')

        dispatch({
          type: type.GET_REPORTS,
          reports: {
            reportsCount: vCount,
            binnaclesCount: bCount,
            reports: resp[0].data,
            binnacles: resp[1].data
          }
        })
      })
    )
  }

  const getReports = async () => {
    const vCount = await counter('visitreport')

    dispatch({
      type: type.GET_VISIT_REPORTS,
      reports: {
        reportsCount: vCount,
        reports: reports.data
      }
    })
  }

  const getBinnacles = async () => {
    const bCount = await counter('channelreport')

    dispatch({
      type: type.GET_CHANNEL_REPORTS,
      reports: {
        binnaclesCount: bCount,
        binnacles: binnacles.data
      }
    })
  }

  console.log(reqType)

  switch (reqType) {
    case 'visits':
      getReports()
      break
    case 'channels':
      getBinnacles()
      break
    default:
      getall()
      break
  }
}

export const fetchVisit = id => async dispatch => {
  const url = `${apiUrl}/event-books/${id}`
  dispatch({ type: type.LOADING, load: true })
  return axios
    .get(url, getAuth())
    .then(({ data }) => {
      dispatch({
        type: type.GET_VISITS_DETAILS,
        visit: data
      })
      dispatch({ type: type.LOADING, load: false })
    })
    .catch(err => dispatch({ type: type.ERROR, error: err }))
}

export const getBio = id => async dispatch => {
  const url = `${apiUrl}/get-messages/${id}`
  dispatch({ type: type.LOADING, load: true })
  return axios
    .get(url, getAuth())
    .then(({ data }) => {
      dispatch({
        type: type.GET_VISIT_BIO,
        messages: data
      })
      dispatch({ type: type.LOADING, load: false })
    })
    .catch(err => {
      dispatch({ type: type.ERROR, error: err })
      dispatch({ type: type.LOADING, load: false })
    })
}

export const getRoles = () => async dispatch => {
  const url = `${apiUrl}/association-areas`
  dispatch({ type: type.LOADING, load: true })

  return axios
    .get(url, getAuth())
    .then(({ data }) => {
      dispatch({
        type: type.GET_ROLES,
        roles: data
      })
      dispatch({ type: type.LOADING, load: false })
    })
    .catch(err => dispatch({ type: type.ERROR, error: err }))
}

export const createVisitRequest = form => async dispatch => {
  const url = `${apiUrl}/event-books`
  dispatch({ type: type.LOADING, load: true })
  return axios
    .post(url, form, getAuth())
    .then(({ data }) => {
      dispatch({
        type: type.REQUEST_VISIT,
        vistisRequest: data
      })
      dispatch({ type: type.LOADING, load: false })
      dispatch({
        type: type.NOTIFICATIONS,
        notification: { message: 'Solicitud enviada con exito' }
      })
    })
    .catch(err => {
      dispatch({ type: type.ERROR, error: err })
      dispatch({ type: type.LOADING, load: false })
    })
}
