import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import * as type from '../../store/reducers/types'

import Button from '../UI/button'
import Modal from '../UI/modal'
import FormImput from '../UI/input'
import { Wrapper, Slide, FormWrapp } from './styles'
import slide1 from '../../assets/slide1.png'
import slide2 from '../../assets/slide2.png'
import slide3 from '../../assets/slide3.png'
import slide4 from '../../assets/slide4.png'
import { createProfile } from '../../store/actions/editProfile'
import { useDispatch, useSelector } from 'react-redux'
import { Error, ModalContent } from '../hoc/userWrapper'

export const OnBoarding = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.login.user)
  const errorMsg = useSelector(state => state.errors)
  const [volume, setVolume] = useState(true)
  const [modalOn, setModal] = useState(false)
  const [slidePos, setSlidePos] = useState(0)
  const [form, setForm] = useState({})
  const [error, setError] = useState()

  const handleAudio = (index, type) => {
    const itemId = `desc-${index}`
    const item = document.getElementById(itemId)
    console.log(item)
    // setSlidePos(index)
    return item[type]()
  }

  const settings = {
    dots: true,
    infinite: false
    // beforeChange: i => handleAudio(i, 'pause'),
    // afterChange: i => handleAudio(i, 'play')
  }

  const handleForm = async () => {
    await dispatch(createProfile(form))
  }

  useEffect(() => {
    user && setForm({ ...form, code: user.acm.code })
    // handleAudio(0, 'play')
  }, [user])

  useEffect(() => {
    errorMsg.errors && setModal(false)
    errorMsg.errors && setError(errorMsg.errors.message)
  }, [errorMsg.errors])

  /* const pauseAudio = () => {
    const state = volume ? 'pause' : 'play'
    handleAudio(slidePos, state)
  }

  useEffect(() => {
    pauseAudio()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volume]) */

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
            Bienvenido a la App de la Asociación Canal Maule.
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
            Comunícate con tu celador de forma rápida y directa
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
            Revisa el volumen de la Laguna del Maule y tus cuotas de agua.
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
            Consulta el estado de tus solicitudes, reclamos y/o solicita una
            visita.
            <Button
              display='block'
              margin='0 auto'
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
      {error && error.length >= 4 && (
        <Modal>
          <ModalContent type='error'>
            <i className='fas fa-exclamation-triangle'></i>
            <p>{error}</p>
            <Button
              background='error'
              width='100%'
              onClick={() => setError(false)}
            >
              Volver
            </Button>
          </ModalContent>
        </Modal>
      )}
      {modalOn && (
        <Modal
          closeAction={setModal}
          action={() => handleForm()}
          txtAction='Guardar'
        >
          <h1>Actualiza tus datos</h1>
          <p>
            Antes de comenzar, necesitamos los siguientes datos para mejorar tu
            experiencia en la App Canal Maule
          </p>
          <FormWrapp onSubmit={() => handleForm(form)}>
            <FormImput
              className='form-input'
              label='Número de teléfono celular'
            >
              <input
                type='phone'
                placeholder='+569 XXXX XXXX'
                onChange={e =>
                  setForm({ ...form, contact_telephone: e.target.value })
                }
              />
            </FormImput>
            <FormImput
              className='form-input'
              label='Dirección para correspondencia'
            >
              <input
                type='text'
                placeholder='Calle Nº XX, Comuna'
                onChange={e =>
                  setForm({ ...form, contact_address: e.target.value })
                }
              />
            </FormImput>
            <FormImput className='form-input' label='Correo electrónico'>
              <input
                type='mail'
                placeholder='ejemplo@correo.cl'
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </FormImput>
          </FormWrapp>
        </Modal>
      )}
    </Wrapper>
  )
}
