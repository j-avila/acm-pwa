import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import UserWrapper from '../../hoc/userWrapper'
import Button from '../../UI/button'
import Card from '../../UI/card'
import { FormIrrigator, FormWatchman } from './form'
import { Wrapper } from './styles'

const NotificationsForm = () => {
  // store
  const channelsList = useSelector(({ channelsList }) => channelsList)
  const usersList = useSelector(({ irrigators }) => irrigators)
  const notification = useSelector(({ notifications }) => notifications)

  // states
  const [area, setArea] = useState()

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
          {area === 'irrigators' ? <FormIrrigator /> : <FormWatchman />}
        </Card>
      </Wrapper>
    </UserWrapper>
  )
}

export default NotificationsForm
