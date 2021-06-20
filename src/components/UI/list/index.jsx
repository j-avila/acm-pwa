import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ItemsList } from './styles'
import { useSelector } from 'react-redux'

const List = props => {
  const { items, action, refresh, count, data } = props
  const loading = useSelector(({ loading }) => loading)
  const [page, setPage] = useState({ from: 0, to: 20 })

  const handleAction = item => {
    !action ? console.log(item) : action(item)
  }

  const refreshHandler = async () => {
    setPage({ from: page.from + 20, to: page.to + 20 })
  }

  useEffect(() => {
    page.from !== 0 && refresh && refresh(page.from, page.to, data)
  }, [page])

  return (
    <ItemsList>
      {loading && items.length <= 1 ? (
        <i className='fas fa-spinner fa-spin fa-3x' />
      ) : items && items.length >= 1 ? (
        <>
          {items.map(item => (
            <li key={item.id} onClick={() => handleAction(item)}>
              <span>
                <strong>{item.title}</strong>
                {item.subtitle && item.subtitle}
              </span>
              <i className={`fas ${item.status || 'fa-chevron-right'}`}></i>
            </li>
          ))}
          {items.length < count ? (
            <span className='paginator' onClick={() => refreshHandler()}>
              {loading && items.length >= 1 ? (
                <i className='fas fa-sync fa-spin fa-3x' />
              ) : (
                <>
                  Cargar 20 más
                  <i className='fas fa-angle-down' />
                </>
              )}
            </span>
          ) : items.length === count ? (
            <span>Haz llegado al final de la lista</span>
          ) : (
            ''
          )}
        </>
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
