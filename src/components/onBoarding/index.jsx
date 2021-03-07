import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

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
  const [slidePos, setSlidePos] = useState(0)

  const handleLog = () => {
    history.push('/panel-de-control')
  }

  const handleAudio = (index, type) => {
    const itemId = `desc-${index}`
    const item = document.getElementById(itemId)
    console.log(item)
    setSlidePos(index)
    return item[type]()
  }

  const settings = {
    dots: true,
    infinite: false,
    beforeChange: i => handleAudio(i, 'pause'),
    afterChange: i => handleAudio(i, 'play')
  }

  useEffect(() => {
    handleAudio(0, 'play')
  }, [])

  const pauseAudio = () => {
    const state = volume ? 'pause' : 'play'
    handleAudio(slidePos, state)
  }

  useEffect(() => {
    // pauseAudio()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volume])

  return (
    <Wrapper>
      <Button
        className='toggle-volume'
        background='none'
        onClick={() => setVolume(!volume)}
      >
        <i className={`fas ${volume ? 'fa-volume-up' : 'fa-volume-mute'}`} />
      </Button>
      <Slider {...settings}>
        <Slide bgImg={slide1}>
          <p>
            Bienvenido a la APP de la asociación Canal Maule Descubre lo que
            puedes hacer con ella
            <audio id='desc-0'>
              <source
                src='https://previews.customer.envatousercontent.com/files/306824419/preview.mp3'
                type='audio/mpeg'
              />
            </audio>
          </p>
        </Slide>
        <Slide bgImg={slide2}>
          <p>
            Comunícate con tu celador de forma rápida y fácil
            <audio id='desc-1'>
              <source
                src='https://previews.customer.envatousercontent.com/files/285087907/preview.mp3'
                type='audio/mpeg'
              />
            </audio>
          </p>
        </Slide>
        <Slide bgImg={slide3}>
          <p>
            Revisa tus Cuentas y cuotas de agua
            <audio id='desc-2'>
              <source
                src='https://previews.customer.envatousercontent.com/files/306825723/preview.mp3'
                type='audio/mpeg'
              />
            </audio>
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
            <audio id='desc-3'>
              <source
                src='https://previews.customer.envatousercontent.com/files/318188604/preview.mp3'
                type='audio/mpeg'
              />
            </audio>
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
