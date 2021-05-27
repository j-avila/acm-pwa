import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import * as type from '../../store/reducers/types'

export const EndSession = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    localStorage.clear()
    dispatch({
      type: type.LOGIN_FORM,
      form: null
    })
    dispatch({
      type: type.GET_USER,
      user: null
    })
    history.push('/inicio')
  }, [])

  return <div></div>
}
