/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Card from '../UI/card'
import * as types from '../../store/reducers/types'
import FormInput from '../UI/input'
import Button from '../UI/button'
import Logo from '../../assets/logo.png'
import { Wrapper, Error } from './styles'
import Modal from '../UI/modal'
import { loginHandler, userDataHandler } from '../../store/actions/login'
import { useDispatch, useSelector } from 'react-redux'

const Login = props => {
  const dispatch = useDispatch()
  const history = useHistory()
  const login = useSelector(({ login }) => login)
  const user = useSelector(({ user }) => user)
  const errorMsg = useSelector(({ errors }) => errors)
  const [form, setForm] = useState({
    identifier: '',
    password: ''
  })
  const [visiblePassword, viewPassword] = useState(false)
  const [validForm, setValid] = useState(false)
  const [error, setError] = useState(false)

  const handleLogin = event => {
    dispatch(loginHandler(form))

    event.preventDefault()
  }

  const isValid = () => {
    const valid =
      form.identifier.length >= 4 && form.password.length >= 4
        ? false
        : 'disabled'
    setValid(valid)
  }

  useEffect(() => {
    isValid()
  }, [form])

  useEffect(() => {
    login.jwt && dispatch(userDataHandler())
  }, [login])

  useEffect(() => {
    if (login.hasOwnProperty('jwt') && user) {
      if (login.jwt && !login.user) {
        history.push('/tour')
      } else if (login.jwt && user) {
        history.push('/panel-de-control')
      }
    } else {
      setError(true)
    }
  }, [login.user])

  useEffect(() => {
    errorMsg && setError(errorMsg.message)
  }, [errorMsg])

  return (
    <>
      <Wrapper>
        <Card>
          <img src={Logo} alt='Canal del maule' />
          <form onSubmit={e => handleLogin(e)}>
            <FormInput className='field' label='Ingresa tu Código de Regante'>
              <input
                type='text'
                placeholder='Código de Regante'
                onChange={e => setForm({ ...form, identifier: e.target.value })}
              />
            </FormInput>
            <FormInput className='field append' label='Ingresa tu Contraseña'>
              <span className='wrapper'>
                <input
                  type={visiblePassword ? 'text' : 'password'}
                  placeholder='Tu contraseña'
                  style={{ display: 'inline-block', width: 'calc(90% - 36px)' }}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                />
                <i
                  className={`fas ${
                    visiblePassword ? 'fa-eye-slash' : 'fa-eye'
                  }`}
                  onClick={() => viewPassword(!visiblePassword)}
                ></i>
              </span>
            </FormInput>
            <Button width='100%' type='submit' disabled={validForm}>
              Ingresar
            </Button>
          </form>
          <p>
            ¿Tienes problemas para iniciar sesión? <br />
            <a href='telf:+56500 600 400'>
              <strong>Contáctanos al 500 600 400</strong>
            </a>
          </p>
        </Card>
      </Wrapper>
      {error && (
        <Modal>
          <Error>
            <i className='fas fa-exclamation-triangle'></i>
            <p>{error}</p>
            <Button
              background='error'
              width='100%'
              onClick={() => {
                dispatch({ type: types.ERROR, error: null })
                setError(false)
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

export default Login
