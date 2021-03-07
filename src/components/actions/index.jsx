import React from 'react'
import { ActionWrapper } from './styles'
import Card from '../UI/card'
import UserWrapper from '../hoc/userWrapper'

const ActionsIndex = () => {
  return (
    <UserWrapper>
      <ActionWrapper>
        <Card>
          <h1>Tienes</h1>
          <h2>13.5 acciones</h2>
        </Card>
      </ActionWrapper>
    </UserWrapper>
  )
}

export default ActionsIndex
