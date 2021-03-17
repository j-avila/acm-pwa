import React from 'react'
import { useHistory } from 'react-router'
import UserWrapper from '../hoc/userWrapper'
import Tabs, { Panel } from '../UI/tabs'
import Button from '../UI/button'
import Accordion from '../UI/accordion'
import List from '../UI/list'
import { DebtWrapper } from './styles'

const Debts = () => {
  const history = useHistory()

  const handleItem = id => {
    // alert(id)
    history.push({ pathname: `/deudas/${id}`, state: { type: 'notpayed' } })
  }
  const handlePayed = id => {
    // alert(id)
    history.push({ pathname: `/deudas/${id}`, state: { type: 'payed' } })
  }

  return (
    <UserWrapper pathName='Deudas'>
      <DebtWrapper>
        <Tabs selected={0}>
          <Panel title='por pagar'>
            <Accordion title={`próximas a vencer (${dummy.length})`} openend>
              <List items={dummy} action={handleItem} />
            </Accordion>
            <Accordion title={`vencidas (${dummy.length})`}>
              <List items={dummy} action={handleItem} />
            </Accordion>
          </Panel>
          <Panel title='pagado'>
            <List items={dummy} action={handlePayed} />
          </Panel>
        </Tabs>
        <Button
          width='80%'
          display='block'
          onClick={() => history.push({ pathname: '/deudas/new' })}
        >
          Solicitar Reporte de Deuda
        </Button>
      </DebtWrapper>
    </UserWrapper>
  )
}

export default Debts

const dummy = [
  {
    id: 1,
    title: 'algun titulo',
    subtitle: 'Vence el 20/12/2020',
    payed: true
  },
  {
    id: 2,
    title: 'algun otro titulo dos',
    subtitle: 'Vence el 20/12/2020',
    payed: false
  }
]
