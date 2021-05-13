/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react'
import UserWrapper, { ModalContent } from '../../hoc/userWrapper'
import Card from '../../UI/card'
import Button from '../../UI/button'
import FormInput from '../../UI/input'
import { ActionArea, RequestWrapper } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { createRequest, getRoles } from '../../../store/actions/bookings'
import * as type from '../../../store/reducers/types'
import Modal from '../../UI/modal'
import { useHistory } from 'react-router'

const RequestForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const hiddenFileInput = useRef(null)
  const requests = useSelector(({ requests }) => requests)
  const notification = useSelector(({ notifications }) => notifications)
  const roles = useSelector(({ requests }) => requests.roles)
  const user = useSelector(({ user }) => user)
  const [location, setLocation] = useState()
  const [form, setForm] = useState({})
  const [listRequests, setList] = useState()
  const [invalid, setValid] = useState(true)

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
    dispatch(createRequest(form))
  }

  const handleModalAction = () => {
    if (notification.type === 'location') {
      dispatch({ type: type.NOTIFICATIONS, notification: false })
    } else {
      dispatch({ type: type.NOTIFICATIONS, notification: false })
      history.push('/solicitudes')
    }
  }

  useEffect(() => {
    dispatch(getRoles())
    user &&
      setForm({
        ...form,
        irrigator_code: user.code,
        type: 'requestforattention'
      })
  }, [])

  useEffect(() => {
    user &&
      roles &&
      setForm({
        ...form,
        irrigator_code: user.code,
        association_area: roles[0].id,
        type: 'requestforattention'
      })
  }, [user, roles])

  useEffect(() => {
    requests.hasOwnProperty('roles') && setList(requests.roles)
    // checking for form validation
    form.association_area &&
      form.subject &&
      form.content &&
      form.content.length >= 30 &&
      setValid(false)
  }, [requests, form])

  useEffect(() => {
    if (location) {
      dispatch({
        type: type.NOTIFICATIONS,
        notification: {
          message: 'localización copiada exitosamente',
          type: 'location'
        }
      })
    }
  }, [location])

  return (
    <UserWrapper pathName='Nueva Solicitud'>
      <RequestWrapper onSubmit={e => handleForm(e)}>
        <h1>Crea una nueva solicitud de atención</h1>
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
              <option disabled selected>
                Selecciona una opción
              </option>
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
              <option disabled selected>
                Selecciona un asunto recurrente
              </option>
              {subjectSelect.map(subject => (
                <option key={subject.label} value={subject.label}>
                  {subject.label}
                </option>
              ))}
            </select>
          </FormInput>
          {form.subject === 'Otro' && (
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
          <span>(Debe tener minimo 30 caracteres)</span>

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
            <Button className='btn-send' type='submit' disabled={invalid}>
              Enviar
            </Button>
          </ActionArea>
        </Card>
      </RequestWrapper>
      {notification && notification.hasOwnProperty('message') && (
        <Modal>
          <ModalContent type='success'>
            <i className='fas fa-check'></i>
            <p>{notification.message}</p>
            <Button
              background='primary'
              width='100%'
              onClick={() => {
                handleModalAction()
              }}
            >
              Volver
            </Button>
          </ModalContent>
        </Modal>
      )}
    </UserWrapper>
  )
}

export default RequestForm
