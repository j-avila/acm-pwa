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
import { checkRole, removeDuplicates } from '../../hoc/utils'
import Select from 'react-select'
import { getIssues } from '../../../store/actions/requests'

const RequestForm = ({ location }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const requests = useSelector(({ requests }) => requests)
  const notification = useSelector(({ notifications }) => notifications)
  const roles = useSelector(({ requests }) => requests.roles)
  const issues = useSelector(({ recurrentIssues }) => recurrentIssues)
  const user = useSelector(({ user }) => user)
  const session = useSelector(({ login }) => login)
  const [geolocation, setLocation] = useState()
  const [form, setForm] = useState({})
  const [listRequests, setList] = useState()
  const [invalid, setValid] = useState(true)
  const [irrigators, setIrrigators] = useState([])
  const [channels, setChannels] = useState([])

  const [subjectSelect, setSubjects] = useState([])

  const handleForm = e => {
    let data =
      form.subject === 'Otro' ? { ...form, subject: form.otherSubject } : form

    e.preventDefault()
    dispatch(createRequest(data))
  }

  const handleModalAction = () => {
    if (notification.type === 'geolocation') {
      dispatch({ type: type.NOTIFICATIONS, notification: false })
    } else {
      dispatch({ type: type.NOTIFICATIONS, notification: false })
      history.push({
        pathname: `/solicitudes/${requests.requestDetail.id}`,
        state: { id: requests.requestDetail.id }
      })
    }
  }

  useEffect(() => {
    dispatch(getRoles())
    dispatch(getIssues(location.state.type))
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
      location.state &&
      setForm({
        ...form,
        irrigator_code: user.code || location.state.code,
        association_area: roles[0].id,
        type: location.state.type || 'requestforattention'
      })
  }, [user, roles, location])

  useEffect(() => {
    issues.length >= 1 && setSubjects([...issues, { id: 0, subject: 'Otro' }])
  }, [issues])

  useEffect(() => {
    subjectSelect.length <= 1 && setForm({ ...form, subject: 'Otro' })
  }, [subjectSelect])

  useEffect(() => {
    requests.hasOwnProperty('roles') && setList(requests.roles)
    // checking for form validation
    if (
      location.state.type === 'requestforattention' ||
      location.state.type === 'annotation'
    ) {
      form.association_area &&
        form.subject &&
        form.content &&
        form.content.length >= 30 &&
        setValid(false)
    } else if (
      location.state.type === 'channelreport' ||
      location.state.type === 'visitreport'
    ) {
      form.irrigator_code &&
        form.visitreport_data &&
        form.visitreport_data.date &&
        form.content &&
        form.content.length >= 30 &&
        setValid(false)
    }
  }, [requests, form])

  useEffect(() => {
    if (geolocation) {
      dispatch({
        type: type.NOTIFICATIONS,
        notification: {
          message: 'localización copiada exitosamente',
          type: 'geolocation'
        }
      })
    }
  }, [geolocation])

  useEffect(() => {
    if (
      session &&
      session.association_user &&
      session.association_user.hasOwnProperty('assigned_irrigators')
    ) {
      let arranged = session.association_user.assigned_irrigators.map(user => ({
        label: user.name,
        value: user.code
      }))
      setIrrigators(arranged)
    }
    if (
      user.hasOwnProperty('assigned_irrigators') &&
      user.assigned_irrigators &&
      user.assigned_irrigators.length >= 1
    ) {
      let channels = removeDuplicates(
        user.assigned_irrigators,
        item => item.channel
      )
      let channelsList = channels.map(channel => ({
        label: channel.channel_name,
        value: channel.channel
      }))
      setChannels(channelsList)
    }
  }, [session, user])

  return (
    <UserWrapper pathName={location.state.name || 'Nueva Solicitud'}>
      <RequestWrapper onSubmit={e => handleForm(e)}>
        <h1>
          {location.state.type === 'visitreport'
            ? 'Crear un nuevo reporte de visita'
            : location.state.type === 'channelreport'
            ? 'Crear reporte de canal'
            : location.state.type === 'annotation'
            ? 'crear anotación'
            : 'Crea una nueva solicitud de atención'}
        </h1>
        <Card className='form-card'>
          {location.state.type === 'channelreport' && (
            <FormInput label='Selecciona un Canal' width='100%'>
              <select onChange={e => setForm({ ...form, channel: e.value })}>
                {channels && channels.length >= 1 ? (
                  channels.map(channel => (
                    <option value={channel.value}>{channel.label}</option>
                  ))
                ) : (
                  <option disabled selected>
                    No tienes canales asignados
                  </option>
                )}
              </select>
            </FormInput>
          )}
          {checkRole(session, 'irrigator') ? (
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
                  listRequests.map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.name}
                    </option>
                  ))}
              </select>
            </FormInput>
          ) : (
            location.state.type !== 'channelreport' && (
              <>
                <FormInput label='seleccionar al Regante'>
                  <Select
                    options={irrigators}
                    classNamePrefix='select'
                    value={
                      irrigators.filter(i => i.value === location.state.code)[0]
                    }
                    placeholder='Seleccionar regante'
                    onChange={e =>
                      setForm({ ...form, irrigator_code: e.value })
                    }
                    components={{
                      IndicatorSeparator: () => null
                    }}
                  />
                </FormInput>
              </>
            )
          )}

          {!checkRole(session, 'irrigartor') &&
            (location.state.type === 'channelreport' ||
              location.state.type === 'visitreport') && (
              <FormInput label='Fecha de la visita'>
                <input
                  type='datetime-local'
                  onChange={e =>
                    setForm({
                      ...form,
                      visitreport_data: { date: e.target.value }
                    })
                  }
                />
              </FormInput>
            )}
          {(location.state.type !== 'channelreport' ||
            subjectSelect.length >= 1) && (
            <FormInput label='¿Cuál es tu problema o necesidad?' width='100%'>
              <select
                onChange={e => setForm({ ...form, subject: e.target.value })}
              >
                {subjectSelect.length >= 2 && (
                  <option disabled selected>
                    Selecciona un asunto recurrente
                  </option>
                )}
                {subjectSelect.length <= 1 ? (
                  <option value='Otro' selected>
                    Otro
                  </option>
                ) : (
                  subjectSelect.map((subject, index) => (
                    <option key={index} value={subject.subject}>
                      {subject.subject}
                    </option>
                  ))
                )}
              </select>
            </FormInput>
          )}

          {(subjectSelect.length <= 1 || form.subject === 'Otro') && (
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
          </FormInput>
          <span>(Debe tener minimo 30 caracteres)</span>

          <ActionArea className='actions'>
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
