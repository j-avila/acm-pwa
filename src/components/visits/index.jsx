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
    history.push(`/visitas/${id}`)
  }

  useEffect(() => {
    dispatch(fetchVisits({}))
  }, [])

  useEffect(() => {
    if (
      visitsList.hasOwnProperty('visitsListed') &&
      visitsList.visitsListed.length >= 1
    ) {
      console.log(visitsList)
      const createList = arr =>
        arr.map(item => ({
          id: item.id,
          title: item.subject,
          subtitle: `Agendada para el: ${moment(item.createdAt).format(
            'DD/MM/YYYY'
          )}`
        }))

      const bookedList = createList(visitsList.visitsListed)
      const endedList = createList(visitsList.visitsListed)

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
          Agendar Visita
        </Button>
      </VisitsWrapper>
    </UserWrapper>
  )
}

export default Visits

const dummy = [
  {
    id: 1,
    title: 'Celador: Rigoberto Hernandez',
    date: '23-10-2022',
    subtitle: 'Programada para el: 12/12/2021',
    inCharge: 'esteban quito',
    body:
      'Estimado señor xxxxx. Se ha agendado una visita a su domicilio ubicado en xxxx, xxxxx. El celador , señor ]xxxxx, se presentará el día 23/12/2020 con el objetivo de revisar  su solicitud : problema con la presión.'
  },
  {
    id: 2,
    title: 'Celador: Alvaro Gomez',
    date: '23-10-2025',
    subtitle: 'Programada para el: 12/12/2021',
    inCharge: 'alan brito',
    body:
      'Estimado señor xxxxx. Se ha agendado una visita a su domicilio ubicado en xxxx, xxxxx. El celador , señor ]xxxxx, se presentará el día 23/12/2020 con el objetivo de revisar  su solicitud : problema con la presión.'
  }
]
const dummyEnded = [
  {
    id: 1,
    title: 'Celador: Rigoberto Hernandez',
    date: '23-10-2022',
    subtitle: 'Programada para el: 12/12/2020',
    inCharge: 'esteban quito',
    body:
      'Estimado señor xxxxx. Se ha agendado una visita a su domicilio ubicado en xxxx, xxxxx. El celador , señor ]xxxxx, se presentará el día 23/12/2020 con el objetivo de revisar  su solicitud : problema con la presión.'
  },
  {
    id: 2,
    title: 'Celador: Alvaro Gomez',
    date: '23-10-2025',
    subtitle: 'Programada para el: 12/12/2018',
    inCharge: 'alan brito',
    body:
      'Estimado señor xxxxx. Se ha agendado una visita a su domicilio ubicado en xxxx, xxxxx. El celador , señor ]xxxxx, se presentará el día 23/12/2020 con el objetivo de revisar  su solicitud : problema con la presión.'
  }
]
