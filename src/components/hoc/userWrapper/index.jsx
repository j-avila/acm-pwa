import React, { useEffect } from 'react'
import Header from '../../UI/header'
import { useHistory } from 'react-router-dom'

const userData = {
  name: 'jhon doe',
  id: '000000',
  role: 'celador'
}

const UserLayout = props => {
  const { children } = props
  const history = useHistory()

  useEffect(() => {
    console.log(history)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Header title={history.location.pathname} user={userData} menu back />
      <section>{children}</section>
    </>
  )
}

export default UserLayout
