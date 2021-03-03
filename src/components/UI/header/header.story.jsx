import React from 'react'
import Header from '.'
import Tabs, { Panel } from '../tabs'

const options = {
  title: 'Header',
  component: Header
}

const userData = {
  name: 'jhon doe',
  id: '000000',
  role: 'celador'
}

const dummyItems = [
  { name: 'inicio', path: '/' },
  { name: 'acerca de nosotros', path: '/algo' }
]

export const BasicUse = () => <Header title='test header' user={userData} />
export const WithTabs = () => (
  <>
    <Header
      title='test header'
      user={userData}
      menuItems={dummyItems}
      notifications={3}
      menu
    />
    <Tabs>
      <Panel title='first'>one</Panel>
      <Panel title='second'>two</Panel>
    </Tabs>
  </>
)

export default options
