import axios from 'axios'
import * as type from '../reducers/types'
// import * type from '../reducers/types'

const options = {
  mode: 'cors',
  cache: 'default',
  'Content-Type': 'application/json'
}

const apiurl = 'https://api.acanalmaule.cl'

export const loginHandler = form => async dispatch => {
  const url = `${apiurl}/auth/local`
  return axios
    .post(url, form, options)
    .then(({ data }) => {
      console.log(data)
      dispatch({
        type: type.LOGIN_FORM,
        form: data
      })
    })
    .catch(err => console.log(err))
}
