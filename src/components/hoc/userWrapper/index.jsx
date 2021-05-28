import React, { useState, useEffect } from 'react'
import Header from '../../UI/header'
import Modal from '../../UI/modal'
import Button from '../../UI/button'
import styled from 'styled-components'
import { userDataHandler } from '../../../store/actions/login'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import * as type from '../../../store/reducers/types'
import { WatchmanInfo } from './styles'
import Avatar from '../../UI/avatar'
import Toggler from '../../UI/toggler'

const menuItems = [
  { name: 'Inicio', path: '/panel-de-control' },
  { name: 'información del canal', path: '/informacion' },
  { name: 'solicitudes', path: '/solicitudes' },
  { name: 'visitas', path: '/visitas' },
  { name: 'deudas', path: '/deudas' },
  { name: 'perfil', path: '/perfil' },
  { name: 'ajustes', path: '/opciones' },
  { name: 'cerrar sesión', path: '/cerrar-sesion' }
]

const adminMenu = [
  { name: 'Inicio', path: '/panel-de-control' },
  { name: 'Regantes', path: '/regantes' },
  { name: 'Solicitudes', path: '/solicitudes' },
  { name: 'Reportes de Visitas', path: '/visitas' },
  { name: 'información de los canales', path: '/canales' },
  // { name: 'perfil', path: '/perfil' },
  // { name: 'ajustes', path: '/opciones' },
  { name: 'cerrar sesión', path: '/cerrar-sesion' }
]

export const ModalContent = styled.div`
  i {
    padding: 12px;
    background: ${({ theme, type }) =>
      type === 'error' ? theme.error : theme.primary};
    border-radius: 50%;
    font-size: 24px;
    color: white;
  }

  p {
    margin: 1rem auto;
    font-weight: 900;
  }
`

const UserLayout = props => {
  const history = useHistory()
  const dispatch = useDispatch()
  const errorMsg = useSelector(({ errors }) => errors)
  const userData = useSelector(({ user }) => user)
  const codeActive = useSelector(({ codeActive }) => codeActive)
  const { children, pathName, action } = props
  const [error, setError] = useState()
  const [watchman, showWatchman] = useState()
  const [userCodes, setCodes] = useState()
  const session = localStorage.getItem('session')
  const userLogged = JSON.parse(localStorage.getItem('userActive'))

  useEffect(() => {
    if (!session) {
      history.push('/inicio')
    } else {
      const role = userLogged.role.name

      if (!userData.hasOwnProperty('acm') || !userData.hasOwnProperty('user')) {
        dispatch(userDataHandler(role))
      }
    }
  }, [])

  useEffect(() => {
    if (userData && userLogged && userLogged.role.name === 'irrigator') {
      !userData.hasOwnProperty('acm') && dispatch(userDataHandler('irrigator'))
    } else if (userData) {
      !userData.hasOwnProperty('user') && dispatch(userDataHandler('watchman'))
    }

    userData.code &&
      !codeActive &&
      dispatch({ type: type.SET_CODE, code: userData.code })

    !userCodes &&
      userData.my_other_codes &&
      userData.my_other_codes.length > 1 &&
      setCodes(userData.my_other_codes)

    userLogged &&
      dispatch({
        type: type.LOGIN_FORM,
        form: userLogged
      })
  }, [userData])

  useEffect(() => {
    errorMsg && errorMsg.hasOwnProperty('message') && setError(errorMsg)
  }, [errorMsg])

  return (
    <>
      {session && (
        <>
          <Header
            title={pathName ? pathName : 'Canal del Maule'}
            menuItems={
              userLogged.role.name === 'irrigator' ? menuItems : adminMenu
            }
            user={userData}
            menu
            back
            onClick={() => showWatchman(true)}
          />
          <section>{children}</section>
          {pathName !== 'Detalle de Solicitud' &&
            userCodes &&
            userCodes.length >= 1 && (
              <Toggler
                items={userData.my_other_codes}
                activeCode={codeActive}
              />
            )}
          {error && error.hasOwnProperty('message') && (
            <Modal>
              <ModalContent type='error'>
                <i className='fas fa-exclamation-triangle'></i>
                <p>{error.message}</p>
                <Button
                  background='error'
                  width='100%'
                  onClick={() => {
                    setError(false)
                    dispatch({ type: type.ERROR, error: '' })
                  }}
                >
                  Volver
                </Button>
              </ModalContent>
            </Modal>
          )}
          {watchman && userData.watchman && (
            <Modal>
              <h1>Conoce a tu celador</h1>
              <WatchmanInfo>
                <Avatar
                  width='80px'
                  height='80px'
                  className='avatar'
                  image={userData.watchman.picture}
                  altTxt={userData.watchman.name}
                />
                <div className='info'>
                  <p>
                    <strong>Nombre: </strong>
                    {userData.watchman.name}
                  </p>
                  <p>
                    <strong>Teléfono: </strong>
                    {userData.watchman.telephone}
                  </p>
                  <div className='actions'>
                    <Button
                      background='base'
                      onClick={() => showWatchman(false)}
                    >
                      cerrar
                    </Button>
                    <Button>
                      <a href={`tel:${userData.watchman.telephone}`}>
                        <i className='fas fa-phone' /> Llamar
                      </a>
                    </Button>
                  </div>
                </div>
              </WatchmanInfo>
            </Modal>
          )}
        </>
      )}
    </>
  )
}

export default UserLayout
