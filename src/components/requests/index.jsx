import React from 'react'
import { useHistory } from 'react-router'
import UserWrapper from '../hoc/userWrapper'
import Button from '../UI/button'
import List from '../UI/list'
import Tabs, { Panel } from '../UI/tabs'
import { Wrapper } from './styles'

const Requests = props => {
  const history = useHistory()

  const handleItem = id => {
    history.push(`/solicitudes/${id}`)
  }

  return (
    <UserWrapper>
      <Wrapper>
        <Tabs selected={0}>
          <Panel title='Finalizados'>
            <List items={dummy} action={handleItem} />
          </Panel>
          <Panel title='En espera'>
            <List items={dummy} />
          </Panel>
        </Tabs>
        <Button
          className='btn-new'
          width='90%'
          onClick={() => history.push('/solicitudes/new')}
        >
          Crear nueva solicitud/reclamo
        </Button>
      </Wrapper>
    </UserWrapper>
  )
}

const dummy = [
  { id: 1, title: 'algun titulo', status: 'fa-check' },
  { id: 2, title: 'algun otro titulo dos', status: 'fa-times' }
]

export default Requests
