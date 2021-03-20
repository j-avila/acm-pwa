/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react'
import UserWrapper from '../hoc/userWrapper'
import Card from '../UI/card'
import Button from '../UI/button'
import FormInput from '../UI/input'
import { ActionArea, RequestWrapper } from './styles'
import { useDispatch } from 'react-redux'

const RequestForm = () => {
  const dispatch = useDispatch()
  const hiddenFileInput = useRef(null)
  const [location, setLocation] = useState()
  const [form, setForm] = useState({
    user: '',
    password: ''
  })

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => setLocation(pos))
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }

  const handleFIleClick = () => {
    hiddenFileInput.current.click()
  }

  const getFile = event => {
    const fileUploaded = event.target.files[0]
    console.log(fileUploaded)
  }

  useEffect(() => {
    if (location) {
      const geoLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
      console.log(geoLocation)
      setForm({ ...form, location: geoLocation })
    }
  }, [location])

  useEffect(() => {
    dispatch({ type: 'REQUEST_FORM', form })
  }, [form])

  return (
    <UserWrapper
      pathName='Nueva Solicitud/Reclamo
    '
    >
      <RequestWrapper>
        <h1>Crea una nueva solicitud de atención o reclamo</h1>
        <Card className='form-card'>
          <FormInput
            label='¿A quién está dirigida tu solicitud de atención?'
            width='100%'
          >
            <select onChange={e => setForm({ ...form, area: e.target.value })}>
              <option disabled>Selecciona una opción</option>
              <option value='0'>Mesa de Ayuda</option>
              <option value='1' selected>
                Celador
              </option>
              <option value='2'>Finanzas</option>
            </select>
          </FormInput>
          <FormInput label='¿Cuál es tu problema o necesidad?' width='100%'>
            <select onChange={e => setForm({ ...form, type: e.target.value })}>
              <option disabled>Selecciona un asunto recurrente</option>
              <option value='0'>¿Como puedo traspasar cuotas?</option>
              <option value='1'>Convenios de pago</option>
              <option value='2'>Solicitud</option>
              <option value='3'>Otro</option>
            </select>
          </FormInput>
          {form.type === '3' && (
            <FormInput label='Cree un nuevo asunto si su problema o necesidad no está entre las opciones:'>
              <input
                type='text'
                name='nombre'
                onChange={e => setForm({ ...form, other: e.target.value })}
                placeholder='Describa su solicitud brevemente'
              />
            </FormInput>
          )}
          <FormInput label='Descripción de la solicitud de atención'>
            <textarea
              placeholder='Describe tu problema o necesidad. Puedes ingresar fotos, subir archivos y marcar tu ubicación.'
              cols='6'
              rows='6'
              onChange={e => setForm({ ...form, body: e.target.value })}
            ></textarea>
            <input
              type='file'
              style={{ display: 'none' }}
              ref={hiddenFileInput}
              onChange={e => setForm({ ...form, picture: e.target.value })}
            />
          </FormInput>

          <ActionArea className='actions'>
            <Button background='primary'>
              <i className='fas fa-camera'></i>
            </Button>
            <Button
              ref={handleFIleClick}
              background='rgba(87,162,198,1)'
              onClick={() => handleFIleClick()}
              onChange={e => getFile(e)}
            >
              <i className='fas fa-paperclip'></i>
            </Button>
            <Button background='secondary' onClick={() => getLocation()}>
              <i className='fas fa-crosshairs'></i>
            </Button>
            <Button className='btn-send'>Enviar</Button>
          </ActionArea>
        </Card>
      </RequestWrapper>
    </UserWrapper>
  )
}

export default RequestForm
