import React from 'react'
import Menu from '.'

const options = {
  title: 'Menu',
  component: Menu
}

const dummyItems = [
  { name: 'inicio', path: '/' },
  { name: 'acerca de nosotros', path: '/algo' }
]

export const BasicUse = () => <Menu items={dummyItems} />

export default options
