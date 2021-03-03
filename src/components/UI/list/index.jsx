import React from 'react'
import { itemsList } from './styles'

const List = props => {
  const { items } = props
  return (
    <itemsList>
      {items && items.length >= 1 ? (
        items.map(item => (
          <li key={item.id}>
            {item.title} <i className='fas fa-check'></i>
          </li>
        ))
      ) : (
        <p>no hay items para mostrar</p>
      )}
    </itemsList>
  )
}

export default List
