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
      if(location.state.type === 'visitreport'){
        dispatch({ type: type.NOTIFICATIONS, notification: false })
        history.push({
          pathname: `/visitas`
        })
      }else{
        dispatch({ type: type.NOTIFICATIONS, notification: false })
        history.push({
          pathname: `/solicitudes/${requests.requestDetail.id}`,
          state: { id: requests.requestDetail.id }
        })
      }
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
    issues.length >= 1 && setSubjects([...issues, { id: 0, subject: 'Otro' }])

    /* Setear en caso de no venir ningun asunto a Otro */
    const subjects = issues.filter(item=>item.association_area && item.association_area.id==roles[0].id)
    if(!subjects.length && (location.state.type ==='visitreport' || location.state.type === 'channelreport') ){
      setForm({ ...form, irrigator_code: location.state.code, subject: 'Otro', otherSubject:'', type:location.state.type })
    }
  }, [issues])


  useEffect(() => {
    requests.hasOwnProperty('roles') && setList(requests.roles)
    // checking for form validation
    if (
      location.state.type === 'requestforattention' ||
      location.state.type === 'annotation'
    ) {

      if(form.hasOwnProperty('subject')){
        if(form.subject =="Otro"){
          if(form.hasOwnProperty('otherSubject') && form.otherSubject.length > 10){
            setValid(false)
          }else{
            setValid(true)
          }
        }else{
          if(form.content && form.content.length < 30){
            setValid(true)
          }else{
            form.association_area &&
            form.subject &&
            form.content &&
            form.content.length >= 30 &&
            setValid(false)
          }
        }
      }

    } else if (
      location.state.type === 'visitreport'
    ) {
      form.irrigator_code &&
        form.visitreport_data &&
        form.visitreport_data.date &&
        form.content &&
        form.content.length >= 30 &&
        setValid(false)
    } else if (location.state.type === 'channelreport') {
      form.otherSubject &&
        form.channel_code &&
        form.content &&
        form.content.length >= 30 &&
        form.visitreport_data &&
        form.visitreport_data.date &&
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
    
      if(channels && channels.length >= 1 ) {
        setForm({ ...form, channel_code: channels[0].channel });
      }
    }
  }, [session, user])




  let listaopc = [];
  if(listRequests){
    subjectSelect.forEach((res) => {
      if (res.hasOwnProperty('association_area')) {
          if(res.association_area.id === form.association_area){
            listaopc.push({
              id: res.id,
              subject: res.subject,
              type: res.type
            });
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
                onChange={e => setForm({ ...form, channel_code: e.target.value })}
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
                  const subjects = subjectSelect.filter(item=>item.association_area && item.association_area.id==e.target.value)
                  if(!subjects.length){
                    setForm({ ...form, association_area: e.target.value, subject: 'Otro', otherSubject:'' })
                  }else {
                    setForm({ ...form, association_area: e.target.value, subject: '', otherSubject:'' })
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
                  onChange={e =>
                    setForm({
                      ...form,
                      visitreport_data: { date: e.target.value }
                    })
                  }
                />
              </FormInput>
            )}

            <FormInput label='Consultas más frecuentes' width='100%'>
              <select
                onChange={e => setForm({ ...form, subject: e.target.value })}
              >
                <option selected={(form.subject === '')?'selected':''}>
                  Selecciona un asunto recurrente
                </option>                                    
                {listaopc &&(
                  listaopc.map((subject, index) => (
                    <option key={index} value={subject.subject}>
                      {subject.subject}
                    </option>
                  ))

                )}                           
                <option value='Otro' selected={(form.subject === 'Otro')?'selected':''}>
                  Otro
                </option>                              
              </select>
            </FormInput>

          {(form.subject === 'Otro') && (
            <FormInput label='Escriba un título:'>
              <input
                type='text'
                name='nombre'
                onChange={e =>
                  setForm({ ...form, otherSubject: e.target.value })
                }
                placeholder='Título breve'
                value={form.otherSubject}
              />
            </FormInput>
          )}



          <FormInput label='Breve descripción'>
            <textarea
              placeholder='Describa brevemente lo colocado en el título.'
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
