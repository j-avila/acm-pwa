import React, { useState, useEffect } from 'react'
import Header from '../../UI/header'
import Modal from '../../UI/modal'
import Button from '../../UI/button'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { userDataHandler } from '../../../store/actions/login'
import * as type from '../../../store/reducers/types'

const dummyItems = [
  { name: 'panel de control', path: '/panel-de-control' },
  { name: 'información del canal', path: '/informacion' },
  { name: 'solicitudes y reclamos', path: '/solicitudes' },
  { name: 'visitas', path: '/visitas' },
  { name: 'deudas', path: '/deudas' },
  { name: 'perfil', path: '/perfil' },
  { name: 'ajustes', path: '/opciones' },
  { name: 'cerrar sesión', path: '/cerrar_sesion' }
]

export const Error = styled.div`
  i {
    padding: 12px;
    background: ${({ theme }) => theme.error};
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
  const { children, pathName } = props
  const [error, setError] = useState()
  const session = localStorage.getItem('session')

  useEffect(() => {
    !session && history.push('/inicio')
    dispatch(userDataHandler())
  }, [])

  useEffect(() => {
    console.log(errorMsg)
    errorMsg && errorMsg.hasOwnProperty('message') && setError(errorMsg)
  }, [errorMsg])

  return (
    <>
      <Header
        title={pathName ? pathName : 'Canal del Maule'}
        menuItems={dummyItems}
        user={userData.user}
        menu
        back
      />
      <section>{children}</section>
      {error && error.message.length >= 4 && (
        <Modal>
          <Error>
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
          </Error>
        </Modal>
      )}
    </>
  )
}

export default UserLayout
