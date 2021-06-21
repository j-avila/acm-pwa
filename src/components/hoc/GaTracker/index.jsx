import React, { useEffect } from 'react'
import ReactGA from 'react-ga'

const GATracker = props => {
  const { children, location } = props

  useEffect(() => {
    ReactGA.pageview(location.pathname)
    console.log(location.pathname)
  }, [location])

  return <>{children}</>
}

export default GATracker
