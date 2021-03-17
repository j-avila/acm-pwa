import React from 'react'
import Header from '../../UI/header'

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
  { name: 'información del canal', path: '/informacion' },
  { name: 'opciones', path: '/opciones' }
]

const UserLayout = props => {
  const { children, pathName } = props

  return (
    <>
      <Header
        title={pathName ? pathName : 'Canal del Maule'}
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
