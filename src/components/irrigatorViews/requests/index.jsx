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
  const requests = useSelector(({ requests }) => requests)
  // const count = useSelector(({ requests }) => requests.count)
  const code = useSelector(({ codeActive }) => codeActive)
  const [openList, setOpenList] = useState([])
  const [closedList, setClosedList] = useState([])

  const handleItem = ({ id }) => {
    history.push({
      pathname: `/solicitudes/${id}`,
      state: { id: id }
    })
  }

  useEffect(() => {
    dispatch(fetchRequests(code))
    dispatch(fetchRequests(code, 1, 20, true))
  }, [])

  useEffect(() => {
    code && dispatch(fetchRequests(code))
    code && dispatch(fetchRequests(code, 1, 20, true))
  }, [code])

  useEffect(() => {
    if (requests.open && requests.open.data.length >= 1) {
      let formatted = requests.open.data.map(item => ({
        id: item.id,
        title: item.subject,
        subtitle: `Creada el: ${moment(item.createdAt).format('DD/MM/YYYY')}`
      }))
      setOpenList(formatted)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requests.open])

  useEffect(() => {
    requests.closed && console.log('closed has done some shit', requests.closed)

    if (requests.closed && requests.closed.data.length >= 1) {
      let closedFormated = requests.closed.data.map(item => ({
        id: item.id,
        title: item.subject,
        closed: item.closed,
        subtitle: `Creada el: ${moment(item.createdAt).format('DD/MM/YYYY')}`
      }))

      setClosedList(closedFormated)
    }
  }, [requests.closed])

  return (
    <UserWrapper pathName='Solicitudes de Atención'>
      <Wrapper>
        <Tabs selected={0}>
          <Panel title='Abiertas'>
            <List
              items={openList}
              action={handleItem}
              count={openList.count}
              listed
            />
          </Panel>
          <Panel title='Cerradas'>
            <List
              items={closedList}
              action={handleItem}
              count={closedList.count}
              listed
            />
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
