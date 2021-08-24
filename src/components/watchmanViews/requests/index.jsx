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

const AdminRequests = props => {
  const dispatch = useDispatch()
  const history = useHistory()
  const requests = useSelector(({ requests }) => requests.open)
  const closed = useSelector(({ requests }) => requests.closed)
  const [openList, setOpenList] = useState([])
  const [closedList, setClosedList] = useState([])
  const userLogged = JSON.parse(localStorage.getItem('userActive'))

  const handleItem = ({ id, irrigator }) => {
    history.push({
      pathname: `/solicitudes/${id}`,
      state: { id: id, code: irrigator }
    })
  }

  const fetchPages = (from, to, closed) => {
    dispatch(fetchRequests(null, from, to, closed))
  }

  useEffect(() => {
    dispatch(fetchRequests(null, 0, 20, false))
    dispatch(fetchRequests(null, 0, 20, true))
  }, [])

  useEffect(() => {
    let formatted

    if (requests.data && requests.data.length >= 1) {
      formatted = requests.data
        .filter(i => i.closed === false)
        .map(item => ({
          id: item.id,
          title: item.subject,
          subtitle: `Creada el: ${moment(item.createdAt).format('DD/MM/YYYY')}`,
          irrigator: item.irrigator_code
        }))
      setOpenList(formatted)
    }
    if (closed.data && closed.data.length >= 1) {
      formatted = closed.data
        .filter(i => i.closed === true)
        .map(item => ({
          id: item.id,
          title: item.subject,
          closed: item.closed,
          subtitle: `Creada el: ${moment(item.createdAt).format('DD/MM/YYYY')}`,
          irrigator: item.irrigator_code
        }))
      setClosedList(formatted)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requests, closed])

  return (
    <UserWrapper pathName='Solicitudes de Atención'>
      <Wrapper>
        <Tabs selected={0}>
          <Panel title='Abiertas'>
            <List
              data={false}
              items={openList}
              action={handleItem}
              refresh={fetchPages}
              count={requests.count}
              listed
            />
          </Panel>
          <Panel title='Finalizados'>
            <List
              data={true}
              items={closedList}
              action={handleItem}
              refresh={fetchPages}
              count={closed.count}
              listed
            />
          </Panel>
        </Tabs>
        {["adminacm","sectionm"].includes(userLogged.role.type) ? null :(
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
        )}
      </Wrapper>
    </UserWrapper>
  )
}

export default AdminRequests
