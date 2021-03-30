/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react'
import UserWrapper from '../hoc/userWrapper'
import Card from '../UI/card'
import Button from '../UI/button'
import FormInput from '../UI/input'
import { ActionArea, RequestWrapper } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { createDebtRequest } from '../../store/actions/debts'
import { getRoles } from '../../store/actions/bookings'

const DebtForm = () => {
  const dispatch = useDispatch()
  const hiddenFileInput = useRef(null)
  const roles = useSelector(({ requests }) => requests.roles)
  const user = useSelector(({ user }) => user)
  const [location, setLocation] = useState()
  const [form, setForm] = useState({
    subject: 'Finanzas'
  })

  const subjectSelect = [{ label: 'Convenios de pago' }]

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
    // console.log(form)
    dispatch(createDebtRequest(form))
  }

  useEffect(() => {
    dispatch(getRoles())
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
    setForm({ ...form, location: location })
  }, [location])

  return (
    <UserWrapper pathName='Reporte de deuda'>
      <RequestWrapper>
        <h1>Crea una nueva solicitud de atención o reclamo</h1>
        <Card className='form-card'>
          <FormInput label='¿Cuál es su problema o necesidad?' width='100%'>
            <select
              disabled
              onChange={e => setForm({ ...form, subject: e.target.value })}
            >
              {roles &&
                roles
                  .filter(o => o.name === 'Finanzas')
                  .map(o => (
                    <option value={roles.id} selected>
                      {o.name}
                    </option>
                  ))}
            </select>
          </FormInput>
          <FormInput label='¿Cuál es tu problema o necesidad?' width='100%'>
            <select
              disabled
              onChange={e => setForm({ ...form, subject: e.target.value })}
            >
              <option disabled>Selecciona un asunto recurrente</option>
              {subjectSelect.map(subject => (
                <option key={subject.label} value={subject.label} selected>
                  {subject.label}
                </option>
              ))}
            </select>
          </FormInput>
          <FormInput label='Descripción de la solicitud de atención'>
            <textarea
              onChange={e => setForm({ ...form, content: e.target.value })}
              placeholder='Describe tu problema o necesidad. Puedes ingresar fotos, subir archivos y marcar tu ubicación.'
              cols='6'
              rows='6'
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
            <Button className='btn-send' onClick={e => handleForm(e)}>
              Enviar
            </Button>
          </ActionArea>
        </Card>
      </RequestWrapper>
    </UserWrapper>
  )
}

export default DebtForm
