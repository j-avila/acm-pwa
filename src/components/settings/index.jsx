import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import {
  editProfile,
  editProfileAcmUser
} from '../../store/actions/editProfile'
import UserWrapper from '../hoc/userWrapper'
import Button from '../UI/button'
import FormInput from '../UI/input'
import { Wrapper, SettingsContainer } from './styles'

const Settings = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const codeActive = useSelector(({ codeActive }) => codeActive)
  const [appSettings, setTheme] = useState({
    size: user.app_setting?.size,
    theme: user.app_setting?.theme
  })
  const userLogged = JSON.parse(localStorage.getItem('userActive'))

  const handleOptions = () => {
    if (userLogged.role.name === 'irrigator') {
      const userSettings = {
        ...user.profile,
        app_setting: { ...appSettings }
      }
      const code = codeActive || user.code
      dispatch(editProfile(userSettings, code))
    } else {
      const userSettings = {
        app_setting: appSettings
      }
      dispatch(editProfileAcmUser(userSettings))
    }
  }

  useEffect(() => {
    user?.app_setting &&
      setTheme({
        size: user.app_setting.size || 'normal',
        theme: user.app_setting.theme || 0
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
  { label: 'Normal', value: 'normal' },
  { label: 'Media', value: 'medium' },
  { label: 'Grande', value: 'large' }
]

const Themes = [
  { label: 'claro', value: 0 },
  { label: 'Oscuro', value: 1 }
]
