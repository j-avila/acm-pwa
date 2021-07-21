import React, { useEffect } from 'react'
import { IndexWrapper } from './styles'
import Card from '../UI/card'
import Button from '../UI/button'
import Logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as types from '../../store/reducers/types'

const Login = props => {
  const disaptch = useDispatch()

  useEffect(() => {
    disaptch({ type: types.ERROR, error: {} })
  }, [])
  return (
    <IndexWrapper>
      <Card>
        <img src={Logo} alt='Canal del maule' />

        <Button
          display='block'
          margin='4rem auto'
          background='indigoGradient'
        >
          <Link to='/ingreso'>Ingresar</Link>
        </Button>
        <p>
          ¿Tienes problemas para iniciar sesión? <br />
          <a href='telf:+56962787034'>
            <strong>Contáctanos al (+569) 6278 7034</strong>
          </a>
        </p>
      </Card>
    </IndexWrapper>
  )
}

export default Login
