import React from 'react'
import { useHistory } from 'react-router'
import UserWrapper from '../hoc/userWrapper'
import Tabs, { Panel } from '../UI/tabs'
import Accordion from '../UI/accordion'
import List from '../UI/list'
import { DebtWrapper } from './styles'

const Debts = () => {
  const history = useHistory()

  const handleItem = id => {
    // alert(id)
    history.push(`/deudas/${id}`)
  }

  return (
    <UserWrapper>
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
            <List items={dummy} action={handleItem} />
          </Panel>
        </Tabs>
      </DebtWrapper>
    </UserWrapper>
  )
}

export default Debts

const dummy = [
  {
    id: 1,
    title: 'algun titulo',
    subtitle: 'vence el 20/12/2020',
    payed: true
  },
  {
    id: 2,
    title: 'algun otro titulo dos',
    subtitle: 'vence el 20/12/2020',
    payed: false
  }
]
