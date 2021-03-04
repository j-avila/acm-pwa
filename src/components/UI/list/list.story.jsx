import React from 'react'
import List from '.'

const options = {
  title: 'List',
  component: List
}

const dummy = [
  { id: 1, title: 'algun titulo', status: 'read' },
  { id: 2, title: 'algun otro titulo dos', status: 'not-read' }
]

export const basicUse = () => <List items={dummy} />

export default options
