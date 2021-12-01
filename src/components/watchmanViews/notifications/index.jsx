import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChannels } from '../../../store/actions/dashboard'
import { setNotification } from '../../../store/actions/notifications'
import { fetchWatchmans } from '../../../store/actions/watchmans'
import UserWrapper from '../../hoc/userWrapper'
import Button from '../../UI/button'
import Card from '../../UI/card'
import { FormIrrigator, FormWatchman } from './form'
import { Wrapper } from './styles'

const NotificationsForm = () => {
  // store
  const dispatch = useDispatch()
  const channelsList = useSelector(({ channelsList }) => channelsList)
  const watchmansList = useSelector(({ watchmans }) => watchmans)

  // states
  const [area, setArea] = useState('irrigators')

  const submitForm = notification => {
    dispatch(setNotification(notification))
  }

  const getOptions = () => {
    dispatch(fetchWatchmans())
    dispatch(getChannels())
  }

  useEffect(() => {
    getOptions()
  }, [])

  return (
    <UserWrapper>
      <Wrapper>
        <h1>Crear notificacion</h1>
        <p>Selecciona un area a notificar</p>
        <div className='selector'>
          <Button
            background={area === 'irrigators' ? 'primary' : 'grey'}
            onClick={() => setArea('irrigators')}
          >
            {area === 'irrigators' && <i class='far fa-bell'></i>}
            Regantes
          </Button>
          <Button
            background={area === 'watchmans' ? 'primary' : 'grey'}
            onClick={() => setArea('watchmans')}
          >
            {area === 'watchmans' && <i class='far fa-bell'></i>}
            Celadores
          </Button>
        </div>
        <Card className='form-card'>
          {area === 'irrigators' ? (
            <FormIrrigator
              watchmans={watchmansList}
              channels={channelsList}
              submitAction={submitForm}
            />
          ) : (
            <FormWatchman
              watchmans={watchmansList}
              channels={channelsList}
              submitAction={submitForm}
            />
          )}
        </Card>
      </Wrapper>
    </UserWrapper>
  )
}

export default NotificationsForm
