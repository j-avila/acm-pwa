import React from 'react'
import { useHistory } from 'react-router'
import UserWrapper from '../hoc/userWrapper'
import List from '../UI/list'
import Tabs, { Panel } from '../UI/tabs'
import { VisitsWrapper } from './styles'
const Visits = () => {
  const history = useHistory()

  const handleItem = id => {
    // alert(id)
    history.push(`/visitas/${id}`)
  }
  return (
    <UserWrapper pathName='Visitas'>
      <VisitsWrapper>
        <Tabs selected={0}>
          <Panel title='Agendadas'>
            <List items={dummy} action={handleItem} />
          </Panel>
          <Panel title='Finalizadas'>
            <List items={dummyEnded} action={handleItem} />
          </Panel>
        </Tabs>
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
