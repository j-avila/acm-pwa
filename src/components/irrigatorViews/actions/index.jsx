import React from 'react'
import { ActionWrapper } from './styles'
import Card from '../../UI/card'
import UserWrapper from '../../hoc/userWrapper'
import { useSelector } from 'react-redux'

const ActionsIndex = () => {
  const actions = useSelector(({ user }) => user.acm)
 
  return (
    <UserWrapper>
      <ActionWrapper>
        <Card>
          <h2>
            Rol:
            {`${actions.rol || 'no definido'}`}
          </h2>
          <p>
            <strong>FJS: </strong>
            {actions.inscription_fsj || 'No definido'}
          </p>
          <p>
            <strong>Numero de inscripción:</strong>
            {actions.inscription_number || 'No definido'}
          </p>
          <p>
            <strong>Año de inscripción:</strong>
            {actions.inscription_year || 'No definido'}
          </p>

          <h1>Tienes</h1>
          <h2>{`${actions.number_of_actions || 'No definido'} acciones`}<br/>( {actions.water_flow} )</h2>
        </Card>
      </ActionWrapper>
    </UserWrapper>
  )
}

export default ActionsIndex
