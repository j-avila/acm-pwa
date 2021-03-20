import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import Card from '../UI/card'
import FormInput from '../UI/input'
import Button from '../UI/button'
import Modal from '../UI/modal'
import { Wrapper } from './styles'

const Register = props => {
  const history = useHistory()
  const [visiblePassword, viewPassword] = useState(false)
  const [modalOn, setModalOn] = useState(false)
  const [modalType, setType] = useState()
  return (
    <>
      <Wrapper>
        <Card>
          <p>
            <strong>
              Bienvenido a Asociación Canal Maule Para crear tu contraseña
              necesitamos los siguientes datos:
            </strong>
          </p>
          <FormInput className='field' label='código de regante'>
            <input type='text' />
          </FormInput>
          <FormInput className='field' label='Número de telefono'>
            <input type='phone' />
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
          <FormInput className='field' label='Confirma tu contraseña'>
            <input type={visiblePassword ? 'text' : 'password'} />
          </FormInput>

          <div className='actions'>
            <Button background='secondary' onClick={() => history.goBack()}>
              <i className='fas fa-arrow-left'></i> Volver
            </Button>
            <Button onClick={() => setModalOn('verify')}>Ingresar</Button>
          </div>
          <p>
            ¿Tienes problemas para iniciar sesión? <br />
            <a href='telf:+56500 600 400'>
              <strong>Contáctanos al 500 600 400</strong>
            </a>
          </p>
        </Card>
      </Wrapper>

      {modalOn && <Modal closeAction={setModalOn}></Modal>}
    </>
  )
}

Register.propTypes = {}

export default Register
