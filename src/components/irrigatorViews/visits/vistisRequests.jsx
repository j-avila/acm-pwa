/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react'
import UserWrapper, { ModalContent } from '../../hoc/userWrapper'
import Card from '../../UI/card'
import Button from '../../UI/button'
import FormInput from '../../UI/input'
import { ActionArea, RequestWrapper } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { createVisitRequest, getRoles } from '../../../store/actions/visits'
import * as type from '../../../store/reducers/types'
import { checkRole, truncate } from '../../hoc/utils'
import Select from 'react-select'
import Modal from '../../UI/modal'
import { useHistory } from 'react-router'

const VistisForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const visits = useSelector(({ visits }) => visits)
  const notification = useSelector(({ notifications }) => notifications)
  const user = useSelector(({ user }) => user)
  const codeActive = useSelector(({ codeActive }) => codeActive)
  const [location, setLocation] = useState()
  const [form, setForm] = useState({})
  const [visitsList, setList] = useState()
  const [irrigators, setIrrigators] = useState([])

  const handleForm = e => {
    e.preventDefault()
    dispatch(createVisitRequest(form))
  }

  const handleModalAction = () => {
    if (notification.type === 'geolocation') {
      dispatch({ type: type.NOTIFICATIONS, notification: false })
    } else {
      dispatch({ type: type.NOTIFICATIONS, notification: false })
      history.push({
        pathname: `/solicitudes`
      })
    }
  }

  useEffect(() => {
    dispatch(getRoles())
    user &&
      setForm({
        ...form,
        irrigator_code: codeActive || user.code,
        type: 'requestforattention',
        subject: 'Solicitud de Visita',
        association_area:
          visitsList && visitsList.filter(e => e.code === 'watchman')[0].id
      })
  }, [])

  useEffect(() => {
    visits.hasOwnProperty('roles') && setList(visits.roles)

    if (
      user &&
      user.association_user &&
      user.association_user.hasOwnProperty('assigned_irrigators')
    ) {
      let arranged = user.association_user.assigned_irrigators.map(
        irrigator => ({
          label: `(${irrigator.code}) ${irrigator.name}`,
          value: irrigator.code
        })
      )
      setIrrigators(arranged)
    }
  }, [visits])

  useEffect(() => {
    visitsList &&
      setForm({
        ...form,
        association_area: visitsList.filter(e => e.code === 'watchman')[0].id
      })
  }, [visitsList])

  useEffect(() => {
    form.content?.length > 25 &&
      setForm({ ...form, subject: truncate(form.content, 25) })
  }, [form.content])

  return (
    <UserWrapper pathName='Nueva Solicitud'>
      <RequestWrapper onSubmit={e => handleForm(e)}>
        <h1>Crea una solicitud de visita</h1>
        <Card className='form-card'>
          {!checkRole(user) ? (
            <FormInput label='seleccionar al Regante'>
              <Select
                options={irrigators}
                classNamePrefix='select'
                value={
                  irrigators.filter(i => i.value === location.state.code)[0]
                }
                placeholder='Seleccionar regante'
                onChange={e => setForm({ ...form, irrigator_code: e.value })}
                components={{
                  IndicatorSeparator: () => null
                }}
              />
            </FormInput>
          ) : (
            <FormInput
              label='¿A quién está dirigida tu solicitud de atención?'
              width='100%'
            >
              <select
                onChange={e =>
                  setForm({ ...form, association_area: e.target.value })
                }
                disabled
              >
                <option>Selecciona una opción</option>
                {visitsList &&
                  visitsList
                    .filter(e => e.code === 'watchman')
                    .map(option => (
                      <option key={option.id} value={option.id} selected>
                        {option.name}
                      </option>
                    ))}
              </select>
            </FormInput>
          )}

          <FormInput label='Breve Descripción'>
            <textarea
              placeholder='Describe el problema o necesidad.'
              cols='6'
              rows='6'
              onChange={e => setForm({ ...form, content: e.target.value })}
            ></textarea>
          </FormInput>

          <ActionArea className='actions'>
            <Button className='btn-send' type='submit'>
              Enviar
            </Button>
          </ActionArea>
        </Card>
      </RequestWrapper>
      {notification && notification.hasOwnProperty('message') && (
        <Modal>
          <ModalContent type='success'>
            <i className='fas fa-check' />
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

export default VistisForm
