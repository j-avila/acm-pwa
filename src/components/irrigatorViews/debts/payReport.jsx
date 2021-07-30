/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react'
import UserWrapper, { ModalContent } from '../../hoc/userWrapper'
import Card from '../../UI/card'
import Button from '../../UI/button'
import FormInput from '../../UI/input'
import { ActionArea, DeatilWrapper } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { createDebtRequest, sendPay } from '../../../store/actions/debts'
import { getRoles } from '../../../store/actions/bookings'
import * as type from '../../../store/reducers/types'
import Modal from '../../UI/modal'
import { useHistory } from 'react-router'
import moment from 'moment'
import Select from 'react-select'
import { getBanks } from '../../../store/actions/requests'

const PayReport = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const hiddenFileInput = useRef(null)
  const roles = useSelector(({ requests }) => requests.roles)
  const notification = useSelector(({ notifications }) => notifications)
  const banksInfo = useSelector(({ banksInfo }) => banksInfo)
  const user = useSelector(({ user }) => user)
  const codeActive = useSelector(({ codeActive }) => codeActive)
  const [preview, setPreview] = useState()
  const [form, setForm] = useState({ attachment: '', data: {} })
  const [valid, setValid] = useState()
  const [banks, setBanks] = useState()

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
    dispatch(sendPay(form))
  }

  const handleModalAction = () => {
    if (notification.type === 'location') {
      dispatch({ type: type.NOTIFICATIONS, notification: false })
    } else {
      dispatch({ type: type.NOTIFICATIONS, notification: false })
      history.push('/deudas')
    }
  }

  // validation
  const validate = () => {
    if (
      form.attachment &&
      form.data.payment_date &&
      form.data.payment_number &&
      form.data.bank
    ) {
      setValid(true)
    } else {
      setValid(false)
    }
  }

  useEffect(() => {
    dispatch(getRoles())
    dispatch(getBanks())
  }, [])

  useEffect(() => {
    user &&
      roles &&
      setForm({
        ...form,
        data: {
          ...form.data,
          code: codeActive || user.code,
          year: moment().format('YYYY'),
          stock_type: 0
        }
      })
  }, [user, roles])

  useEffect(() => {
    const list =
      banksInfo.length >= 1 &&
      banksInfo.map(e => ({ label: e.name, value: e.code }))
    setBanks(list)
  }, [banksInfo])

  useEffect(() => {
    validate()
  }, [form])

  return (
    <UserWrapper pathName='Reporte de pago'>
      <DeatilWrapper>
        <h1>Enviar reporte de pago</h1>
        <Card className='form-card'>
          <FormInput label='Fecha de pago'>
            <input
              type='date'
              max={moment().format('YYYY-MM-DD')}
              onChange={e =>
                setForm({
                  ...form,
                  data: { ...form.data, payment_date: e.target.value }
                })
              }
              required
            />
          </FormInput>
          <FormInput label='Numero de operación'>
            <input
              type='number'
              placeholder='Número de transferencia/deposito'
              onChange={e =>
                setForm({
                  ...form,
                  data: { ...form.data, payment_number: e.target.value }
                })
              }
              required
            />
          </FormInput>
          <FormInput label='Banco'>
            <Select
              options={banks}
              classNamePrefix='select'
              placeholder='¿En que banco realizo el pago?'
              onChange={e =>
                setForm({ ...form, data: { ...form.data, bank: e.value } })
              }
              components={{
                IndicatorSeparator: () => null
              }}
            />
          </FormInput>
          <FormInput label='Monto'>
            <input
              type='number'
              placeholder='Cantidad pagada'
              onChange={e =>
                setForm({
                  ...form,
                  data: { ...form.data, amount: e.target.value }
                })
              }
              required
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
            accept='image/*'
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
            <Button
              className='btn-send'
              onClick={e => handleForm(e)}
              disabled={valid ? '' : 'disabled'}
            >
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
