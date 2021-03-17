import React from 'react'
import Header from '../../UI/header'

const userData = {
  name: 'jhon doe',
  id: '000000',
  role: 'celador'
}

const dummyItems = [
  { name: 'inicio', path: '/panel-de-control' },
  { name: 'información del canal', path: '/informacion' },
  { name: 'solicitudes y reclamos', path: '/solicitudes' },
  { name: 'visitas', path: '/visitas' },
  { name: 'deudas', path: '/deudas' },
  { name: 'perfil', path: '/opciones' },
  { name: 'ajustes', path: '/opciones' },
  { name: 'cerrar sesión', path: '/opciones' }
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
