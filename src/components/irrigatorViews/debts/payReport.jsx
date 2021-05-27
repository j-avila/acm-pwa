/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react'
import UserWrapper, { ModalContent } from '../../hoc/userWrapper'
import Card from '../../UI/card'
import Button from '../../UI/button'
import FormInput from '../../UI/input'
import { ActionArea, DeatilWrapper } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { createDebtRequest } from '../../../store/actions/debts'
import { getRoles } from '../../../store/actions/bookings'
import * as type from '../../../store/reducers/types'
import Modal from '../../UI/modal'
import { useHistory } from 'react-router'

const PayReport = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const hiddenFileInput = useRef(null)
  const roles = useSelector(({ requests }) => requests.roles)
  const notification = useSelector(({ notifications }) => notifications)
  const user = useSelector(({ user }) => user)
  const [location, setLocation] = useState()
  const [preview, setPreview] = useState()
  const [form, setForm] = useState()

  const handleFIleClick = () => {
    hiddenFileInput.current.click()
  }

  // saving img to state
  const handleImg = e => {
    let reader = new FileReader()
    let file = e.target.files[0]

    reader.onloadend = () => {
      setPreview({ img: reader.result, filename: e.target.files[0].name })
      setForm({
        ...form,
        attachment: file
      })
    }

    reader.readAsDataURL(file)
  }

  const handleForm = e => {
    console.log(form)
    // dispatch(createDebtRequest(form))
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
        irrigator_code: user.code,
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
    <UserWrapper pathName='Reporte de pago'>
      <DeatilWrapper>
        <h1>Enviar reporte de pago</h1>
        <Card className='form-card'>
          <FormInput label='Fecha de pago'>
            <input
              type='date'
              onChange={e => setForm({ ...form, payment_date: e.target.value })}
            />
          </FormInput>
          <FormInput label='Numero de operación'>
            <input
              type='number'
              onChange={e =>
                setForm({ ...form, payment_number: e.target.value })
              }
            />
          </FormInput>
          <FormInput label='Banco'>
            <input
              type='text'
              onChange={e => setForm({ ...form, bank: e.target.value })}
            />
          </FormInput>
          <FormInput label='Monto'>
            <input
              type='number'
              onChange={e => setForm({ ...form, amount: e.target.value })}
            />
          </FormInput>
          {preview && (
            <div className='attach-preview'>
              <div className='thumbnail'>
                <img src={preview.img} alt='file' />
              </div>
              <p>
                <strong> Nombre del adjunto:</strong> <br /> {preview.filename}
              </p>
              <i
                className='fas fa-trash'
                onClick={() => {
                  setForm({
                    ...form,
                    file: undefined
                  })
                  setPreview(undefined)
                }}
              />
            </div>
          )}
          <input
            type='file'
            typeof='.jepg, .png, .jpg'
            style={{ display: 'none' }}
            ref={hiddenFileInput}
            onChange={e => handleImg(e)}
          />

          <ActionArea className='actions'>
            <Button
              className='btn-send'
              background='secondary'
              onClick={e => handleFIleClick()}
            >
              <i className='fa fa-click' />
              Adjuntar comprobante
            </Button>
            <Button className='btn-send' onClick={e => handleForm(e)}>
              Enviar
            </Button>
          </ActionArea>
        </Card>
      </DeatilWrapper>
      {notification && notification.hasOwnProperty('message') && (
        <Modal>
          <ModalContent type='success'>
            <i className='fas fa-check'></i>
            <p>{notification.message}</p>
            <Button
              background='primary'
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

export default PayReport
