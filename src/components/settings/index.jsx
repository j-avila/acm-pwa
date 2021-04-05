import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editSettings } from '../../store/actions/editProfile'
import UserWrapper from '../hoc/userWrapper'
import Button from '../UI/button'
import FormInput from '../UI/input'
import { Wrapper, SettingsContainer } from './styles'

const Settings = () => {
  const dispatch = useDispatch()
  const [appSettings, setTheme] = useState({
    size: '',
    theme: ''
  })

  const handleOptions = () => {
    dispatch(editSettings(appSettings))
  }

  return (
    <UserWrapper>
      <Wrapper>
        <header>
          <h1>opciones</h1>
          <p>
            Cambia las opciones de tu app Asociación Canal del Maule para tu
            comodidad
          </p>
        </header>
        <SettingsContainer>
          <FormInput label='Tamaño de letra'>
            <select
              onChange={e => setTheme({ ...appSettings, size: e.target.value })}
            >
              {txtSizes.map(i => (
                <option value={i.value}>{i.label}</option>
              ))}
            </select>
          </FormInput>
          <FormInput label='Tema de colores'>
            <select
              onChange={e =>
                setTheme({ ...appSettings, theme: e.target.value })
              }
            >
              {Themes.map(i => (
                <option value={i.value}>{i.label}</option>
              ))}
            </select>
          </FormInput>

          <Button onClick={() => handleOptions()}>Guardar opciones</Button>
        </SettingsContainer>
      </Wrapper>
    </UserWrapper>
  )
}

export default Settings

const txtSizes = [
  { label: 13, value: '13px' },
  { label: 16, value: '16px' },
  { label: 20, value: '20px' }
]

const Themes = [
  { label: 'claro', value: 0 },
  { label: 'Oscuro', value: 1 }
]
