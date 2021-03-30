import React, { useEffect } from 'react'
import { useHistory } from 'react-router'

export const EndSession = () => {
  const history = useHistory()

  useEffect(() => {
    localStorage.setItem('session', null)
    history.push('/inicio')
  }, [])

  return <div></div>
}
