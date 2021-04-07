import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { fetchVisits } from '../../store/actions/visits'
import UserWrapper from '../hoc/userWrapper'
import Button from '../UI/button'
import List from '../UI/list'
import Tabs, { Panel } from '../UI/tabs'
import { VisitsWrapper } from './styles'
const Visits = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const visitsList = useSelector(({ visits }) => visits)
  const [visits, setVisits] = useState({
    booked: [],
    done: []
  })

  const handleItem = id => {
    // alert(id)
    history.push({ pathname: `/visitas/${id}`, state: { id: id } })
  }

  useEffect(() => {
    dispatch(fetchVisits({}))
  }, [])

  useEffect(() => {
    if (
      visitsList.hasOwnProperty('visitsListed') &&
      visitsList.visitsListed.length >= 1
    ) {
      const createList = arr =>
        arr.map(item => ({
          id: item.id,
          title: item.subject,
          subtitle: `Agendada para el: ${moment(item.createdAt).format(
            'DD/MM/YYYY'
          )}`
        }))

      const bookedList = createList(
        visitsList.visitsListed.filter(e => e.closed === false)
      )
      const endedList = createList(
        visitsList.visitsListed.filter(e => e.closed === true)
      )

      setVisits({ ...visits, booked: bookedList, done: endedList })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visitsList])

  return (
    <UserWrapper pathName='Visitas'>
      <VisitsWrapper>
        <Tabs selected={0}>
          <Panel title='Agendadas'>
            <List items={visits.booked} action={handleItem} />
          </Panel>
          <Panel title='Finalizadas'>
            <List items={visits.done} action={handleItem} />
          </Panel>
        </Tabs>
        <Button onClick={() => history.push('/solicitar-visita')}>
          Solicitar Visita
        </Button>
      </VisitsWrapper>
    </UserWrapper>
  )
}

export default Visits
