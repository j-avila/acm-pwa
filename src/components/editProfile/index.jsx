/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react'
// import PropTypes from 'prop-types'
import UserWrapper from '../hoc/userWrapper'
import Tabs, { Panel } from '../UI/tabs'
import FormInput from '../UI/input'
import { ProfileWrapper, Title, ActionArea } from './styles'
import Avatar from '../UI/avatar'
import Button from '../UI/button'
import { useDispatch } from 'react-redux'
import { Alert } from '../hoc/uiStyles'

const EditProfile = props => {
  const dispatch = useDispatch()
  const hiddenFileInput = useRef(null)
  const [pic, setPic] = useState()
  const [passValid, isValid] = useState(false)
  const [form, setForm] = useState({
    name: '',
    contact_telephone: '',
    contact_address: '',
    email: '',
    picture: undefined
  })

  const handleFileClick = () => {
    hiddenFileInput.current.click()
  }

  // enconde img to base64
  const handleImg = async e => {
    console.log(e)
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

  useEffect(() => {
    // dispatch({ type: 'PROFILE_FORM', form })
    if (form.password === form.confirmPasssword) {
      isValid(true)
    } else {
      isValid(false)
    }
  }, [form])

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
                name='name'
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder=''
              />
            </FormInput>
            <FormInput className='inputForm' label='Numero de teléfono'>
              <input
                type='phone'
                name='phone'
                onChange={e =>
                  setForm({ ...form, contact_telephone: e.target.value })
                }
                placeholder=''
              />
            </FormInput>
            <FormInput className='inputForm' label='Correo Electrónico'>
              <input
                type='mail'
                name='email'
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder=''
              />
            </FormInput>
            <FormInput className='inputForm' label='Dirección'>
              <input
                type='text'
                name='direcion'
                onChange={e =>
                  setForm({ ...form, contact_address: e.target.value })
                }
                placeholder=''
              />
            </FormInput>
            <ActionArea>
              <Button>Cancelar</Button>
              <Button background='secondary'>Guardar</Button>
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
                name='name'
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder=''
              />
            </FormInput>
            <FormInput className='inputForm' label='Repite la contraseña'>
              <input
                type='password'
                name='name'
                onChange={e =>
                  setForm({ ...form, confirmPasssword: e.target.value })
                }
                placeholder=''
              />
            </FormInput>
            {!passValid && (
              <Alert>Las contraseñas deben ser exactamente iguales</Alert>
            )}
            <ActionArea>
              <Button>Cancelar</Button>
              <Button
                background='secondary'
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
