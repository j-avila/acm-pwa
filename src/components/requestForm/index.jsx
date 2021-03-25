/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react'
import UserWrapper from '../hoc/userWrapper'
import Card from '../UI/card'
import Button from '../UI/button'
import FormInput from '../UI/input'
import { ActionArea, RequestWrapper } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { createRequest, getRoles } from '../../store/actions/bookings'

const RequestForm = () => {
  const dispatch = useDispatch()
  const hiddenFileInput = useRef(null)
  const requests = useSelector(({ requests }) => requests)
  const user = useSelector(({ login }) => login.session.user)
  const [location, setLocation] = useState()
  const [form, setForm] = useState({})
  const [listRequests, setList] = useState()

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => setLocation(pos))
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }

  const handleFileClick = () => {
    hiddenFileInput.current.click()
  }

  const getFile = event => {
    const fileUploaded = event.target.files[0]
    console.log(fileUploaded)
  }

  const subjectSelect = [
    { label: '¿Como puedo traspasar cuotas?' },
    { label: 'Convenios de pago' },
    { label: 'Solicitud' },
    { label: 'Otro' }
  ]

  // enconde img to base64
  const handleImg = e => {
    console.log('file to upload:', e.target.files[0])
    let file = e.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = _handleReaderLoaded.bind(this)
      reader.readAsBinaryString(file)
    }
  }

  const _handleReaderLoaded = readerEvt => {
    let binaryString = readerEvt.target.result
    setForm({ ...form, file: btoa(binaryString) })
  }

  const handleForm = e => {
    e.preventDefault()
    console.log(form)
    dispatch(createRequest(form))
  }

  useEffect(() => {
    dispatch(getRoles())
  }, [])

  useEffect(() => {
    console.log(requests)
    requests.hasOwnProperty('roles') && setList(requests.roles)
  }, [requests])

  useEffect(() => {
    if (location) {
      /* const geoLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
      console.log(geoLocation) */
      setForm({ ...form, location: location })
    }
  }, [location, user])

  useEffect(() => {
    user &&
      setForm({
        ...form,
        irrigator_code: user.code,
        type: 'requestforattention'
      })
  }, [user])

  return (
    <UserWrapper pathName='Nueva Solicitud/Reclamo'>
      <RequestWrapper onSubmit={e => handleForm(e)}>
        <h1>Crea una nueva solicitud de atención o reclamo</h1>
        <Card className='form-card'>
          <FormInput
            label='¿A quién está dirigida tu solicitud de atención?'
            width='100%'
          >
            <select
              onChange={e =>
                setForm({ ...form, association_area: e.target.value })
              }
            >
              <option disabled>Selecciona una opción</option>
              {listRequests &&
                listRequests.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
            </select>
          </FormInput>
          <FormInput label='¿Cuál es tu problema o necesidad?' width='100%'>
            <select
              onChange={e => setForm({ ...form, subject: e.target.value })}
            >
              <option disabled>Selecciona un asunto recurrente</option>
              {subjectSelect.map(subject => (
                <option key={subject.label} value={subject.label}>
                  {subject.label}
                </option>
              ))}
            </select>
          </FormInput>
          {form.type === 'Otro' && (
            <FormInput label='Cree un nuevo asunto si su problema o necesidad no está entre las opciones:'>
              <input
                type='text'
                name='nombre'
                onChange={e =>
                  setForm({ ...form, otherSubject: e.target.value })
                }
                placeholder='Describa su solicitud brevemente'
              />
            </FormInput>
          )}
          <FormInput label='Descripción de la solicitud de atención'>
            <textarea
              placeholder='Describe tu problema o necesidad. Puedes ingresar fotos, subir archivos y marcar tu ubicación.'
              cols='6'
              rows='6'
              onChange={e => setForm({ ...form, content: e.target.value })}
            ></textarea>
            <input
              type='file'
              style={{ display: 'none' }}
              ref={hiddenFileInput}
              accept='.jpeg, .png, .jpg'
              onChange={e => handleImg(e)}
            />
          </FormInput>

          <ActionArea className='actions'>
            <Button background='primary'>
              <i className='fas fa-camera'></i>
            </Button>
            <Button
              ref={handleFileClick}
              background='rgba(87,162,198,1)'
              onClick={() => handleFileClick()}
              onChange={e => getFile(e)}
            >
              <i className='fas fa-paperclip'></i>
            </Button>
            <Button background='secondary' onClick={() => getLocation()}>
              <i className='fas fa-crosshairs'></i>
            </Button>
            <Button className='btn-send' type='submit'>
              Enviar
            </Button>
          </ActionArea>
        </Card>
      </RequestWrapper>
    </UserWrapper>
  )
}

export default RequestForm
