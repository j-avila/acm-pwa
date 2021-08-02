import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editProfile } from '../../store/actions/editProfile'
import UserWrapper from '../hoc/userWrapper'
import Button from '../UI/button'
import FormInput from '../UI/input'
import { Wrapper, SettingsContainer } from './styles'

const Settings = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const codeActive = useSelector(({ codeActive }) => codeActive)
  const [appSettings, setTheme] = useState({
    size: '',
    theme: ''
  })

  const handleOptions = () => {
    const userSettings = {
      ...user.profile,
      app_setting: { ...appSettings }
    }
    const code = codeActive || user.code
    dispatch(editProfile(userSettings,code))
  }

  useEffect(() => {
    user &&
    user.profile &&
    user.profile.app_setting &&
    setTheme({
      size: user.profile.app_setting.size || '13px',
      theme: user.profile.app_setting.theme || 0
    })
  }, [user])

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
              value={appSettings.size}
              onChange={e => setTheme({ ...appSettings, size: e.target.value })}
            >
              {txtSizes.map(i => (
                <option key={i.value} value={i.value}>
                  {i.label}
                </option>
              ))}
            </select>
          </FormInput>
          <FormInput label='Tema de colores'>
            <select
              value={appSettings.theme}
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
