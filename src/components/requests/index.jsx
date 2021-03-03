import React from 'react'
import UserWrapper from '../hoc/userWrapper'
import Tabs, { Panel } from '../UI/tabs'

const Requests = () => {
  return (
    <UserWrapper>
      <Tabs selected={0}>
        <Panel title='Finalizados'>
          <div>cheez</div>
        </Panel>
        <Panel title='En espera'>
          <div>cheez2</div>
        </Panel>
      </Tabs>
    </UserWrapper>
  )
}

export default Requests
