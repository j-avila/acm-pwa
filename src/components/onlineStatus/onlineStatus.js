import React, { useState, useEffect } from 'react'

const OnlineStatus = props => {


    const [online, setOnline] = useState(window.navigator.onLine)

    useEffect(() => {
      function handleOnline() {
        setOnline(true)
      }
      function handleOffline() {
        setOnline(false)
      }
      window.addEventListener("online", handleOnline)
      window.addEventListener("offline", handleOffline)
      return () => {
        window.removeEventListener("online", handleOnline)
        window.removeEventListener("offline", handleOffline)
      }
    }, [])

  return !online ? (
    <div>
      Navegador <b>Sin Acceso</b> a Internet  
    </div>
  ) : ""
}

export default OnlineStatus
