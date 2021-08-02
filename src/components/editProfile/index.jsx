/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react'
// import PropTypes from 'prop-types'
import UserWrapper from '../hoc/userWrapper'
import Tabs, { Panel } from '../UI/tabs'
import FormInput from '../UI/input'
import { ProfileWrapper, Title, ActionArea } from './styles'
import Avatar from '../UI/avatar'
import Button from '../UI/button'
import { useDispatch, useSelector } from 'react-redux'
import { Alert } from '../hoc/uiStyles'
import { useHistory } from 'react-router'
import { editProfile } from '../../store/actions/editProfile'
import Modal from '../UI/modal'

const EditProfile = props => {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const codeActive = useSelector(({ codeActive }) => codeActive)
  const hiddenFileInput = useRef(null)
  const [pic, setPic] = useState()
  const [passValid, isValid] = useState(false)
  const [form, setForm] = useState({
    contact_name: '',
    contact_telephone: '',
    contact_address: '',
    email: '',
    picture: undefined
  })

  // capture image event
  const handleFileClick = () => {
    hiddenFileInput.current.click()
  }

  // enconde img to base64
  const handleImg = async e => {
    let file = e.target.files[0]
    const reader = new FileReader()

    if (file) {
      reader.onload = _handleReaderLoaded.bind(this)
      reader.readAsBinaryString(file)
      reader.onloadend = () => {
        setPic(reader.result)
      }
      reader.readAsBinaryString(file)
    }

    // reader.readAsDataURL(file)
  }

  const _handleReaderLoaded = readerEvt => {
    let binaryString = readerEvt.target.result
    setForm({ ...form, picture: btoa(binaryString) })
  }

  // handling form

  const handleForm = () => {
    let formData
    if (form.type === 'userPass') {
      formData = {
        code: form.code,
        password: form.password
      }
    } else {
      formData = {
        code: form.code,
        contact_name: form.contact_name,
        contact_telephone: form.contact_telephone,
        contact_address: form.contact_address,
        email: form.email,
        picture: form.picture
      }
    }

    const code = codeActive || form.code

    dispatch(editProfile(formData, code))
  }

  // stateManagments

  useEffect(() => {
    // dispatch({ type: 'PROFILE_FORM', form })
    if (form.password && form.password.length >= 6) {
      form.password === form.confirmPasssword ? isValid(true) : isValid(false)
    } else {
      isValid(false)
    }
  }, [form])

  useEffect(() => {
    user &&
    user.hasOwnProperty('acm') &&
    user.profile &&
    setForm({
      ...form,
      code: user.acm.code || undefined,
      contact_name: user.profile.contact_name || undefined,
      contact_address: user.profile.contact_address || undefined,
      contact_telephone: user.profile.contact_telephone || undefined,
      email: user.profile.email || undefined,
      picture: user.profile.picture || undefined
    })
    // handleAudio(0, 'play')
  }, [user])

  return (
    <UserWrapper pathName='Editar perfil'>
      <Tabs selected={0}>
        <Panel title='Editar perfil'>
          <ProfileWrapper>
            <Title>
              <h3>Modificar información personal</h3>
              <p>Actualiza o cambia tus datos en la Asociación Canal Maule</p>
            </Title>
            <FormInput className='inputForm avatar'>
              <label>Foto de perfil</label>
              <Avatar image={pic} onClick={e => handleFileClick(e)} />
              <input
                type='file'
                style={{ display: 'none' }}
                ref={hiddenFileInput}
                onChange={e => handleImg(e)}
              />
            </FormInput>
            <FormInput className='inputForm' label='Nombre Completo'>
              <input
                type='text'
                defaultValue={form.contact_name}
                name='contact_name'
                onChange={e =>
                  setForm({
                    ...form,
                    contact_name: e.target.value,
                    type: 'userInfo'
                  })
                }
                placeholder=''
              />
            </FormInput>
            <FormInput className='inputForm' label='Numero de teléfono'>
              <input
                type='phone'
                name='phone'
                defaultValue={form.contact_telephone}
                onChange={e =>
                  setForm({
                    ...form,
                    contact_telephone: e.target.value,
                    type: 'userInfo'
                  })
                }
                placeholder=''
              />
            </FormInput>
            <FormInput className='inputForm' label='Correo Electrónico'>
              <input
                type='mail'
                name='email'
                defaultValue={form.email}
                onChange={e =>
                  setForm({ ...form, email: e.target.value, type: 'userInfo' })
                }
                placeholder=''
              />
            </FormInput>
            <FormInput className='inputForm' label='Dirección'>
              <input
                type='text'
                name='direcion'
                defaultValue={form.contact_address}
                onChange={e =>
                  setForm({
                    ...form,
                    contact_address: e.target.value,
                    type: 'userInfo'
                  })
                }
                placeholder=''
              />
            </FormInput>
            <ActionArea>
              <Button onClick={() => history.push('/panel-de-control')}>
                Cancelar
              </Button>
              <Button background='secondary' onClick={() => handleForm()}>
                Guardar
              </Button>
            </ActionArea>
          </ProfileWrapper>
        </Panel>
        <Panel title='cambiar contraseña'>
          <ProfileWrapper>
            <Title>
              <h3>Cambiar tu contraseña</h3>
              <p>Cambia o actualiza tu contraseña</p>
            </Title>
            <FormInput
              className='inputForm'
              label='Ingresa tu nueva contraseña'
            >
              <input
                type='password'
                name='password'
                onChange={e =>
                  setForm({
                    ...form,
                    password: e.target.value,
                    type: 'userPass'
                  })
                }
                placeholder=''
              />
            </FormInput>
            <FormInput className='inputForm' label='Repite la contraseña'>
              <input
                type='password'
                name='confirmPass'
                defaultValue=''
                onChange={e =>
                  setForm({
                    ...form,
                    confirmPasssword: e.target.value,
                    type: 'userPass'
                  })
                }
                placeholder=''
              />
            </FormInput>
            {!passValid && (
              <Alert>
                Las contraseñas deben ser exactamente iguales y tener 6 o más
                caracteres
              </Alert>
            )}
            <ActionArea>
              <Button onClick={() => history.push('/panel-de-control')}>
                Cancelar
              </Button>
              <Button
                background='secondary'
                onClick={() => handleForm()}
                disabled={passValid ? '' : 'disabled'}
              >
                Guardar
              </Button>
            </ActionArea>
          </ProfileWrapper>
        </Panel>
      </Tabs>
    </UserWrapper>
  )
}

EditProfile.propTypes = {}

export default EditProfile
