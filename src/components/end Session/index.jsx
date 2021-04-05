import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import * as type from '../../store/reducers/types'

export const EndSession = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    localStorage.setItem('session', null)
    localStorage.setItem('userActive', null)
    dispatch({
      type: type.LOGIN_FORM,
      form: {}
    })
    dispatch({
      type: type.GET_USER,
      user: {}
    })
    history.push('/inicio')
  }, [])

  return <div></div>
}
