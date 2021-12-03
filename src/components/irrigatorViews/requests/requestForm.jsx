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
import { checkRole, removeDuplicates, truncate } from '../../hoc/utils'
import Select from 'react-select'
import { getIssues } from '../../../store/actions/requests'
import moment from 'moment'

const RequestForm = ({ location }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const requests = useSelector(({ requests }) => requests)
  const notification = useSelector(({ notifications }) => notifications)
  const roles = useSelector(({ requests }) => requests.roles)
  const issues = useSelector(({ recurrentIssues }) => recurrentIssues)
  const user = useSelector(({ user }) => user)
  const session = useSelector(({ login }) => login)
  const codeActive = useSelector(({ codeActive }) => codeActive)
  const [geolocation, setLocation] = useState()
  const [form, setForm] = useState({
    visitreport_data: {
      date: moment().format('YYYY-MM-DDThh:mm')
    }
  })
  const [listRequests, setList] = useState()
  const [invalid, setValid] = useState(true)
  const [irrigators, setIrrigators] = useState([])
  const [channels, setChannels] = useState([])

  const [subjectSelect, setSubjects] = useState([])

  const handleForm = e => {
    let data =
      form.subject === 'Otro'
        ? { ...form, subject: truncate(form.content) }
        : form

    e.preventDefault()
    dispatch(createRequest(data))
  }

  const handleModalAction = () => {
    if (notification.type === 'geolocation') {
      dispatch({ type: type.NOTIFICATIONS, notification: false })
    } else if (location.state.type === 'visitreport') {
      dispatch({ type: type.NOTIFICATIONS, notification: false })
      history.push({
        pathname: `/visitas`
      })
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
        irrigator_code: location.state.code || codeActive,
        type: 'requestforattention'
      })
  }, [])

  useEffect(() => {
    user &&
      roles &&
      location.state &&
      setForm({
        ...form,
        irrigator_code: location.state.code || codeActive,
        association_area: roles[0].id,
        type: location.state.type || 'requestforattention'
      })
  }, [user, roles, location])

  useEffect(() => {
    requests.hasOwnProperty('roles') && setList(requests.roles)

    // checking for form validation
    if (
      location.state.type === 'requestforattention' ||
      location.state.type === 'annotation'
    ) {
      form.visitreport_data && form.subject && setValid(false)
    } else if (location.state.type === 'visitreport') {
      form.irrigator_code &&
        form.visitreport_data &&
        form.visitreport_data.date &&
        form.subject &&
        setValid(false)
    } else if (location.state.type === 'channelreport') {
      form.channel_code &&
        form.subject &&
        form.visitreport_data &&
        form.visitreport_data.date &&
        setValid(false)
    }
  }, [requests, form])

  useEffect(() => {
    form.content?.length > 25 &&
      setForm({ ...form, subject: truncate(form.content, 25) })
  }, [form.content])

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
        label: `(${user.code}) ${user.name}`,
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

      if (channels && channels.length >= 1) {
        setForm({ ...form, channel_code: channels[0].channel })
      }
    }
  }, [session, user])

  let listaopc = []
  if (listRequests) {
    subjectSelect.forEach(res => {
      if (res.hasOwnProperty('association_area')) {
        if (res.association_area.id === form.association_area) {
          listaopc.push({
            id: res.id,
            subject: res.subject,
            type: res.type
          })
        }
      }
    })
  }

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
            <FormInput label='Selecciona un canal' width='100%'>
              <select
                onChange={e =>
                  setForm({ ...form, channel_code: e.target.value })
                }
              >
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
                onChange={e => {
                  const subjects = subjectSelect.filter(
                    item =>
                      item.association_area &&
                      item.association_area.id == e.target.value
                  )
                  if (!subjects.length) {
                    setForm({
                      ...form,
                      association_area: e.target.value,
                      subject: truncate(form.content, 25)
                    })
                  } else {
                    setForm({
                      ...form,
                      association_area: e.target.value,
                      subject: truncate(form.content, 25)
                    })
                  }
                }}
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
                <FormInput label='Seleccionar al regante'>
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
                  value={form.visitreport_data?.date}
                  onChange={e =>
                    setForm({
                      ...form,
                      visitreport_data: { date: e.target.value }
                    })
                  }
                />
              </FormInput>
            )}
          <FormInput label='Breve descripción'>
            <textarea
              placeholder='Describa brevemente lo colocado en el título.'
              cols='6'
              rows='6'
              onChange={e => setForm({ ...form, subject: e.target.value })}
            ></textarea>
          </FormInput>

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
