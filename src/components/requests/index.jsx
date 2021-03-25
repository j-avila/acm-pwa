import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { fetchRequests } from '../../store/actions/bookings'
import UserWrapper from '../hoc/userWrapper'
import Button from '../UI/button'
import List from '../UI/list'
import Tabs, { Panel } from '../UI/tabs'
import { Wrapper } from './styles'

const Requests = props => {
  const dispatch = useDispatch()
  const history = useHistory()
  const openRequests = useSelector(({ requests }) => requests.open)
  const closedRequests = useSelector(({ requests }) => requests.closed)

  const [openList, setOpenList] = useState([])

  const handleItem = id => {
    history.push(`/solicitudes/${id}`)
  }

  useEffect(() => {
    dispatch(fetchRequests())
  }, [])

  useEffect(() => {
    let openFormatted

    if (openRequests && openRequests.length >= 1) {
      openFormatted = openRequests.map(item => ({
        id: item.id,
        title: item.subject,
        subtitle: `creada el: ${item.createdAt}`
      }))
      setOpenList(openFormatted)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openRequests])

  return (
    <UserWrapper pathName='Solicitudes/Reclamos'>
      <Wrapper>
        <Tabs selected={0}>
          <Panel title='Abiertas'>
            <List items={openList} action={handleItem} />
          </Panel>
          <Panel title='Finalizados'>
            <List items={closedRequests} />
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
