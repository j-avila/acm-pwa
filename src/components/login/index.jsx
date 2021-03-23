/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Card from '../UI/card'
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
  const login = useSelector(state => state.login)
  const errorMsg = useSelector(state => state.errors)
  const [form, setForm] = useState({
    identifier: '',
    password: ''
  })
  const [visiblePassword, viewPassword] = useState(false)
  const [validForm, setValid] = useState()
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
    login.session.jwt && dispatch(userDataHandler())
  }, [login.session])

  useEffect(() => {
    if (
      login.session.hasOwnProperty('jwt') &&
      login.session.hasOwnProperty('user')
    ) {
      if (login.session.jwt && !login.session.user.profile) {
        history.push('/tour')
      } else if (login.session.jwt && login.session.user.profile) {
        history.push('/panel-de-control')
      }
    } else {
      setError(true)
    }
  }, [login.session.user])

  useEffect(() => {
    errorMsg.errors && setError(errorMsg.errors.message)
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
      {error.length >= 4 && (
        <Modal>
          <Error>
            <i className='fas fa-exclamation-triangle'></i>
            <p>{error}</p>
            <Button
              background='error'
              width='100%'
              onClick={() => setError(false)}
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
