import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { fetchRequests } from '../../../store/actions/bookings'
import UserWrapper from '../../hoc/userWrapper'
import Button from '../../UI/button'
import List from '../../UI/list'
import Tabs, { Panel } from '../../UI/tabs'
import { Wrapper } from './styles'

const Requests = props => {
  const dispatch = useDispatch()
  const history = useHistory()
  const requests = useSelector(({ requests }) => requests.open)
  const count = useSelector(({ requests }) => requests.count)
  const code = useSelector(({ codeActive }) => codeActive)
  const [openList, setOpenList] = useState([])
  const [closedList, setClosedList] = useState([])

  const handleItem = ({ id }) => {
    console.log(id)
    // let closed = closedList.filter(i => i.id === id)[0].closed
    history.push({
      pathname: `/solicitudes/${id}`,
      state: { id: id }
    })
  }

  useEffect(() => {
    code && dispatch(fetchRequests(code))
  }, [code])

  useEffect(() => {
    let formatted

    if (requests && requests.count >= 1) {
      formatted = requests.data
        .filter(i => i.closed === false)
        .map(item => ({
          id: item.id,
          title: item.subject,
          subtitle: `creada el: ${moment(item.createdAt).format('DD/MM/YYYY')}`
        }))

      setOpenList(formatted)
    }

    if (requests && requests.count >= 1) {
      formatted = requests.data
        .filter(i => i.closed === true)
        .map(item => ({
          id: item.id,
          title: item.subject,
          closed: item.closed,
          subtitle: `creada el: ${moment(item.createdAt).format('DD/MM/YYYY')}`
        }))
      setClosedList(formatted)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requests])

  return (
    <UserWrapper pathName='Solicitudes de Atención'>
      <Wrapper>
        <Tabs selected={0}>
          <Panel title='Abiertas'>
            <List items={openList} action={handleItem} count={count} listed />
          </Panel>
          <Panel title='Cerradas'>
            <List items={closedList} action={handleItem} count={count} listed />
          </Panel>
        </Tabs>
        <Button
          className='btn-new'
          width='90%'
          onClick={() =>
            history.push({
              pathname: '/solicitudes/new',
              state: { type: 'requestforattention' }
            })
          }
        >
          Crear nueva solicitud
        </Button>
      </Wrapper>
    </UserWrapper>
  )
}

export default Requests
