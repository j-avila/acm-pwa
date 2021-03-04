import React from 'react'
import PropTypes from 'prop-types'
import { ItemsList } from './styles'

const List = props => {
  const { items, action } = props

  const handleAction = id => {
    !action ? console.log(id) : action(id)
  }

  return (
    <ItemsList>
      {items && items.length >= 1 ? (
        items.map(item => (
          <li key={item.id} onClick={() => handleAction(item.id)}>
            {item.title} <i className={`fas ${item.status}`}></i>
          </li>
        ))
      ) : (
        <p>no hay items para mostrar</p>
      )}
    </ItemsList>
  )
}

List.propTypes = {
  items: PropTypes.array,
  action: PropTypes.func
}

List.defaultProps = {
  action: undefined,
  items: []
}

export default List
