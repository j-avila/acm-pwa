import React from 'react'
import { ActionWrapper } from './styles'
import Card from '../UI/card'
import UserWrapper from '../hoc/userWrapper'
import { useSelector } from 'react-redux'

const ActionsIndex = () => {
  const actions = useSelector(({ user }) => user)
  return (
    <UserWrapper>
      <ActionWrapper>
        <Card>
          <h1>Tienes</h1>
          <h2>{`${actions.acm.number_of_actions} acciones`}</h2>
          <h1>Rol</h1>
          <h2>{`${actions.acm.rol}`}</h2>
          {actions.inscription_fsj &&
            actions.inscription_number &&
            actions.inscription_year && (
              <>
                <h1>FOJA</h1>
                <h2>{`${actions.acm.inscription_fsj} acciones`}</h2>
              </>
            )}
        </Card>
      </ActionWrapper>
    </UserWrapper>
  )
}

export default ActionsIndex
