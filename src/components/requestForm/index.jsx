import React, { useEffect, useState, useRef } from 'react'
import UserWrapper from '../hoc/userWrapper'
import Card from '../UI/card'
import Button from '../UI/button'
import FormInput from '../UI/input'
import { ActionArea, RequestWrapper } from './styles'

const RequestForm = () => {
  const hiddenFileInput = useRef(null)
  const [location, setLocation] = useState()

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
    console.log(location)
  }, [location])

  return (
    <UserWrapper>
      <RequestWrapper>
        <h1>Ingreso de nueva solicitud o reclamo</h1>
        <Card className='form-card'>
          <FormInput label='Asunto de solicitud' width='100%'>
            <select>
              <option disabled>Selecciona una opción</option>
              <option>¿Como puedo traspasar cuotas?</option>
              <option>Convenios de pago</option>
              <option>Solicitud</option>
              <option>Otro</option>
            </select>
          </FormInput>
          <FormInput label='Escriba su asunto:'>
            <input
              type='text'
              name='nombre'
              placeholder='Cual es solicitud o reclamo'
            />
          </FormInput>
          <FormInput label='Ingrese su solicitud'>
            <textarea
              placeholder='describa su solicitud o reclamo'
              cols='6'
              rows='6'
            ></textarea>
            <input
              type='file'
              style={{ display: 'none' }}
              ref={hiddenFileInput}
            />
          </FormInput>
          <ActionArea>
            <Button background='primary'>
              <i className='fas fa-camera'></i>
            </Button>
            <Button
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
