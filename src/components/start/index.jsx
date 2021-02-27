import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { IndexWrapper } from './styles'
import Card from '../UI/card'
import Button from '../UI/button'
import Logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

const Login = props => {
  return (
    <IndexWrapper>
      <Card>
        <img src={Logo} alt='Canal del maule' />

        <Button
          width='100%'
          background='indigoGradient'
          onClick={() => console.log('ingresar')}
        >
          <Link to='/ingreso'>Ingresa</Link>
        </Button>
        <p>
          ¿Tienes problemas para iniciar sesión?
          <a href='telf:+56500 600 400'>
            <strong>Contáctanos al 500 600 400</strong>
          </a>
        </p>
      </Card>
    </IndexWrapper>
  )
}

Login.propTypes = {}

export default Login
