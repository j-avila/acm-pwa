import React, { useEffect } from 'react'
import ReactGA from 'react-ga'

const GATracker = props => {
  const { children } = props

  const location = window.location.href

  useEffect(() => {
    ReactGA.pageview(location)
  }, [location])

  return children
}

export default GATracker
