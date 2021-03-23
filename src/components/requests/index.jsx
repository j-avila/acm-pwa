import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { fetchInfoCards } from '../../store/actions/bookings'
import UserWrapper from '../hoc/userWrapper'
import Button from '../UI/button'
import List from '../UI/list'
import Tabs, { Panel } from '../UI/tabs'
import { Wrapper } from './styles'

const Requests = props => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleItem = id => {
    history.push(`/solicitudes/${id}`)
  }

  useEffect(() => {
    dispatch(fetchInfoCards())
  }, [])

  return (
    <UserWrapper pathName='Solicitudes/Reclamos'>
      <Wrapper>
        <Tabs selected={0}>
          <Panel title='Abiertas'>
            <List items={dummy} action={handleItem} />
          </Panel>
          <Panel title='Finalizados'>
            <List items={dummyEnded} />
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
  {
    id: 1,
    title: 'Fallo en el suministro',
    subtitle: 'Creada el: 12/12/2021'
  },
  {
    id: 2,
    title: 'Problemas con el regado',
    subtitle: 'Creada el: 12/12/2021'
  }
]
const dummyEnded = [
  {
    id: 1,
    title: 'Fallo en el suministro',
    subtitle: 'Finalizada el: 12/12/2021'
  },
  {
    id: 2,
    title: 'Problemas con el regado',
    subtitle: 'Finalizada el: 12/12/2021'
  }
]

export default Requests
