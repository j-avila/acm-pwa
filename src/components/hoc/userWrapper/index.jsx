import React, { useEffect } from 'react'
import Header from '../../UI/header'
import { useHistory } from 'react-router-dom'

const userData = {
  name: 'jhon doe',
  id: '000000',
  role: 'celador'
}

const dummyItems = [
  { name: 'inicio', path: '/panel-de-control' },
  { name: 'visitas', path: '/visitas' },
  { name: 'solicitudes', path: '/solicitudes' },
  { name: 'deudas', path: '/deudas' },
  { name: 'información del canal', path: '/informacion' }
]

const UserLayout = props => {
  const { children } = props
  const history = useHistory()

  useEffect(() => {
    // console.log(history)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Header
        title={history.location.pathname}
        menuItems={dummyItems}
        user={userData}
        menu
        back
      />
      <section>{children}</section>
    </>
  )
}

export default UserLayout
