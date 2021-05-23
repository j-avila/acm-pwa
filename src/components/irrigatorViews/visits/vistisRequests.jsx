/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react'
import UserWrapper from '../../hoc/userWrapper'
import Card from '../../UI/card'
import Button from '../../UI/button'
import FormInput from '../../UI/input'
import { ActionArea, RequestWrapper } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { createVisitRequest, getRoles } from '../../../store/actions/visits'
import * as type from '../../../store/reducers/types'
import { checkRole } from '../../hoc/utils'
import Select from 'react-select'

const VistisForm = () => {
  const dispatch = useDispatch()
  const hiddenFileInput = useRef(null)
  const visits = useSelector(({ visits }) => visits)
  const user = useSelector(({ user }) => user)
  const [location, setLocation] = useState()
  const [form, setForm] = useState({})
  const [visitsList, setList] = useState()
  const [irrigators, setIrrigators] = useState([])

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
    dispatch(createVisitRequest(form))
  }

  useEffect(() => {
    dispatch(getRoles())
    user &&
      setForm({
        ...form,
        irrigator_code: user.code,
        type: 'requestforattention',
        subject: 'Solicitud',
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
          label: irrigator.name,
          value: irrigator.code
        })
      )
      setIrrigators(arranged)
    }
  }, [visits])

  useEffect(() => {
    if (location) {
      setForm({ ...form, location: location })
      dispatch({
        type: type.NOTIFICATIONS,
        notification: { message: 'localización copiada exitosamente' }
      })
    }
  }, [location])

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

          <FormInput label='¿Cuál es tu problema o necesidad?' width='100%'>
            <select
              onChange={e => setForm({ ...form, subject: e.target.value })}
              disabled
            >
              {subjectSelect
                .filter(e => e.label === 'Solicitud')
                .map(subject => (
                  <option key={subject.label} value={subject.label} selected>
                    {subject.label}
                  </option>
                ))}
            </select>
          </FormInput>

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
            <Button className='btn-send' type='submit'>
              Enviar
            </Button>
          </ActionArea>
        </Card>
      </RequestWrapper>
    </UserWrapper>
  )
}

export default VistisForm
