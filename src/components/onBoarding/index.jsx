import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Slider from '@farbenmeer/react-spring-slider'
import Button from '../UI/button'
import Modal from '../UI/modal'
import FormImput from '../UI/input'
import { Wrapper, Slide, FormWrapp } from './styles'
import slide1 from '../../assets/slide1.png'
import slide2 from '../../assets/slide2.png'
import slide3 from '../../assets/slide3.png'
import slide4 from '../../assets/slide4.png'

export const OnBoarding = () => {
  const history = useHistory()
  const [volume, setVolume] = useState(true)
  const [modalOn, setModal] = useState(false)

  const handleLog = () => {
    history.push('/inicio')
  }

  return (
    <Wrapper>
      <Button
        className='toggle-volume'
        background='none'
        onClick={() => setVolume(!volume)}
      >
        <i className={`fas ${volume ? 'fa-volume-up' : 'fa-volume-mute'}`} />
      </Button>
      <Slider activeIndex={0} hasBullets auto={8000}>
        <Slide bgImg={slide1}>
          <p>
            Bienvenido a la APP de la asociación Canal Maule Descubre lo que
            puedes hacer con ella
          </p>
        </Slide>
        <Slide bgImg={slide2}>
          <p>Comunícate con tu celador de forma rápida y fácil</p>
        </Slide>
        <Slide bgImg={slide3}>
          <p>
            Revisa tus Cuentas y cuotas de agua <br />
          </p>
        </Slide>
        <Slide bgImg={slide4}>
          <p>
            Conoce el estado de tus solicitudes <br />
            <Button
              background='white'
              color='primary'
              onClick={() => setModal(true)}
            >
              Comenzar
            </Button>
          </p>
        </Slide>
      </Slider>
      {modalOn && (
        <Modal closeAction={setModal} action={handleLog}>
          <h1>Antes de comenzar</h1>
          <p>
            Necesitamos los siguientes datos para mejorar la experiencia de tu
            app Asociación Canal Maule
          </p>
          <FormWrapp>
            <FormImput className='form-input' label='Número de contacto'>
              <input type='phone' />
            </FormImput>
            <FormImput
              className='form-input'
              label='Dirección para correspondencia'
            >
              <input type='text' />
            </FormImput>
            <FormImput className='form-input' label='Correo electronico'>
              <input type='mail' />
            </FormImput>
          </FormWrapp>
        </Modal>
      )}
    </Wrapper>
  )
}
