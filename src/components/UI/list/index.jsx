import React from 'react'
import PropTypes from 'prop-types'
import { ItemsList } from './styles'
import { useSelector } from 'react-redux'

const List = props => {
  const { items, action } = props
  const loading = useSelector(({ loading }) => loading)

  const handleAction = id => {
    !action ? console.log(id) : action(id)
  }

  return (
    <ItemsList>
      {loading ? (
        <i class='fas fa-spinner fa-spin fa-3x'></i>
      ) : items && items.length >= 1 ? (
        items.map(item => (
          <li key={item.id} onClick={() => handleAction(item.id)}>
            <span>
              <strong>{item.title}</strong>
              {item.subtitle && item.subtitle}
            </span>
            <i className={`fas ${item.status || 'fa-chevron-right'}`}></i>
          </li>
        ))
      ) : (
        <p>No hay nada que mostrar</p>
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
