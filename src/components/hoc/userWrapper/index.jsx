import React, { useState, useEffect } from 'react'
import Header from '../../UI/header'
import Modal from '../../UI/modal'
import Button from '../../UI/button'
import styled from 'styled-components'
import { userDataHandler } from '../../../store/actions/login'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import * as type from '../../../store/reducers/types'
import { socket } from '../utils'
const dummyItems = [
  { name: 'panel de control', path: '/panel-de-control' },
  { name: 'información del canal', path: '/informacion' },
  { name: 'solicitudes y reclamos', path: '/solicitudes' },
  { name: 'visitas', path: '/visitas' },
  { name: 'deudas', path: '/deudas' },
  { name: 'perfil', path: '/perfil' },
  { name: 'ajustes', path: '/opciones' },
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
  const notification = useSelector(({ notifications }) => notifications)
  const userData = useSelector(({ user }) => user)
  const [sessionId, setSession] = useState()
  const { children, pathName } = props
  const [error, setError] = useState()
  const session = localStorage.getItem('session')

  useEffect(() => {
    !session && history.push('/inicio')
    !userData && dispatch(userDataHandler())
  }, [])

  useEffect(() => {
    !userData.hasOwnProperty('acm') && dispatch(userDataHandler())
    socket.on('error', err => dispatch({ type: type.ERROR, error: err }))
  }, [userData])

  useEffect(() => {
    errorMsg && errorMsg.hasOwnProperty('message') && setError(errorMsg)
  }, [errorMsg, notification])

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
      {notification && notification.hasOwnProperty('message') && (
        <Modal>
          <ModalContent type='success'>
            <i className='fas fa-check'></i>
            <p>{notification.message}</p>
            <Button
              background='primary'
              width='100%'
              onClick={() => {
                setError(false)
                dispatch({ type: type.NOTIFICATIONS, notification: false })
              }}
            >
              Volver
            </Button>
          </ModalContent>
        </Modal>
      )}
    </>
  )
}

export default UserLayout
