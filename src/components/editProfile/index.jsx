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

const EditProfile = props => {
  const dispatch = useDispatch()
  const hiddenFileInput = useRef(null)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
    picture: undefined
  })

  const handleFIleClick = () => {
    hiddenFileInput.current.click()
  }

  const getFile = event => {
    const fileUploaded = event.target.files[0]
    console.log(fileUploaded)
  }

  useEffect(() => {
    dispatch({ type: 'PROFILE_FORM', form })
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
              <Avatar
                image={form.picture}
                onClick={() => handleFIleClick()}
                onChange={e => getFile(e)}
              />
              <input
                type='file'
                style={{ display: 'none' }}
                ref={hiddenFileInput}
                onChange={e => setForm({ ...form, picture: e.target.value })}
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
                onChange={e => setForm({ ...form, phone: e.target.value })}
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
                onChange={e => setForm({ ...form, address: e.target.value })}
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
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder=''
              />
            </FormInput>
            <FormInput className='inputForm' label='Repite la contraseña'>
              <input
                type='password'
                name='name'
                // onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder=''
              />
            </FormInput>
            <ActionArea>
              <Button>Cancelar</Button>
              <Button background='secondary'>Cambiar</Button>
            </ActionArea>
          </ProfileWrapper>
        </Panel>
      </Tabs>
    </UserWrapper>
  )
}

EditProfile.propTypes = {}

export default EditProfile
