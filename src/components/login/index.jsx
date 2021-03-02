import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import Card from '../UI/card'
import FormInput from '../UI/input'
import Button from '../UI/button'
import Logo from '../../assets/logo.png'
import { Wrapper, Error } from './styles'
import Modal from '../UI/modal'

const Login = props => {
  const history = useHistory()
  const [visiblePassword, viewPassword] = useState(false)
  const [error, setError] = useState(false)
  const [valid, setValid] = useState(true)
  const [firstLog, setFisrt] = useState(true)

  const handleLogin = () => {
    valid && firstLog
      ? history.push('/tour')
      : valid
      ? history.push('/tablero')
      : setError(true)
  }

  return (
    <>
      <Wrapper>
        <Card>
          <img src={Logo} alt='Canal del maule' />
          <FormInput
            className='field'
            label='Ingresa tu Código de regante o Usuario'
          >
            <input type='text' />
          </FormInput>
          <FormInput className='field' label='Crea tu contraseña'>
            <input
              type={visiblePassword ? 'text' : 'password'}
              style={{ display: 'inline-block', width: 'calc(88% - 36px)' }}
              onChange={e => console.log(e)}
            />
            <i
              className={`fas ${visiblePassword ? 'fa-eye-slash' : 'fa-eye'}`}
              onClick={() => viewPassword(!visiblePassword)}
            ></i>
          </FormInput>
          <Button width='100%' onClick={() => handleLogin()}>
            Ingresar
          </Button>
          <p>
            ¿Tienes problemas para iniciar sesión?
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
            <p>
              Ha ocurrido un problema. En este momento no podemos continuar con
              tu ingreso. Inténtalo más tarde.
            </p>
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

Login.propTypes = {}

export default Login
