import axios from 'axios'
import { apiUrl, getAuth } from './utils'
import * as type from '../reducers/types'

export const fetchInfoCards = () => async dispatch => {
  const url = `${apiUrl}/channels-data`

  return axios(url, getAuth()).then(({ data }) => {
    dispatch({
      type: type.GET_INFOCARDS,
      infoCards: data
    })
  })
}
