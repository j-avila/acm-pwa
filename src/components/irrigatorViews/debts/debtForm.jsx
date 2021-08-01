/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react'
import UserWrapper, { ModalContent } from '../../hoc/userWrapper'
import Card from '../../UI/card'
import Button from '../../UI/button'
import FormInput from '../../UI/input'
import { ActionArea, RequestWrapper } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { createDebtRequest } from '../../../store/actions/debts'
import { getRoles } from '../../../store/actions/bookings'
import * as type from '../../../store/reducers/types'
import Modal from '../../UI/modal'
import { useHistory } from 'react-router'

const DebtForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const hiddenFileInput = useRef(null)
  const roles = useSelector(({ requests }) => requests.roles)
  const notification = useSelector(({ notifications }) => notifications)
  const user = useSelector(({ user }) => user)
  const codeActive = useSelector(({ codeActive }) => codeActive)
  const [location, setLocation] = useState()
  const [form, setForm] = useState({
    subject: 'Finanzas'
  })

  const subjectSelect = [{ label: 'Convenios de pago' }]

  const handleFIleClick = () => {
    hiddenFileInput.current.click()
  }

  const getFile = event => {
    const fileUploaded = event.target.files[0]
  }

  // enconde img to base64
  const handleImg = e => {
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
    dispatch(createDebtRequest(form))
  }

  const handleModalAction = () => {
    if (notification.type === 'location') {
      dispatch({ type: type.NOTIFICATIONS, notification: false })
    } else {
      dispatch({ type: type.NOTIFICATIONS, notification: false })
      history.push('/deudas')
    }
  }

  useEffect(() => {
    dispatch(getRoles())
  }, [])

  useEffect(() => {
    user &&
      roles &&
      setForm({
        ...form,
        irrigator_code: codeActive || user.code,
        association_area: roles[0].id,
        type: 'requestforattention'
      })
  }, [user, roles])

  useEffect(() => {
    if (location) {
      setForm({ ...form, location: location })
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
    <UserWrapper pathName='Reporte de deuda'>
      <RequestWrapper>
        <h1>Crea una nueva solicitud de atención</h1>
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
            <Button className='btn-send' onClick={e => handleForm(e)}>
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

export default DebtForm
