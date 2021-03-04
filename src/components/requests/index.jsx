import React from 'react'
import { useHistory } from 'react-router'
import UserWrapper from '../hoc/userWrapper'
import List from '../UI/list'
import Tabs, { Panel } from '../UI/tabs'

const Requests = () => {
  const history = useHistory()

  const handleItem = id => {
    history.push(`/request/${id}`)
  }
  return (
    <UserWrapper>
      <Tabs selected={0}>
        <Panel title='Finalizados'>
          <List items={dummy} action={handleItem} />
        </Panel>
        <Panel title='En espera'>
          <List items={dummy} />
        </Panel>
      </Tabs>
    </UserWrapper>
  )
}

const dummy = [
  { id: 1, title: 'algun titulo', status: 'fa-check' },
  { id: 2, title: 'algun otro titulo dos', status: 'fa-times' }
]

export default Requests
