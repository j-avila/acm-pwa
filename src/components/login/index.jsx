import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Card from '../UI/card'
import FormInput from '../UI/input'
import Button from '../UI/button'
import Logo from '../../assets/logo.png'
import { Wrapper } from './styles'

const Login = props => {
  const [visiblePassword, viewPassword] = useState(false)
  return (
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
        <Button width='100%'>Ingresar</Button>
        <p>
          ¿Tienes problemas para iniciar sesión?
          <a href='telf:+56500 600 400'>
            <strong>Contáctanos al 500 600 400</strong>
          </a>
        </p>
      </Card>
    </Wrapper>
  )
}

Login.propTypes = {}

export default Login
