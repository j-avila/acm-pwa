import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ItemsList } from './styles'
import { useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'

const List = props => {
  const { items, action, status, refresh } = props
  const loading = useSelector(({ loading }) => loading)
  const [page, setPage] = useState({ from: 0, to: 20 })

  const handleAction = item => {
    !action ? console.log(item) : action(item)
  }

  const refreshHandler = async () => {
    refresh && (await refresh(page.from, page.to))
    setPage({ from: page.from + 20, to: page.to + 20 })
  }

  return (
    <ItemsList>
      {loading ? (
        <i className='fas fa-spinner fa-spin fa-3x' />
      ) : items && items.length >= 1 ? (
        <InfiniteScroll
          dataLength={items.length}
          loading={<i className='fas fa-spinner fa-spin fa-3x' />}
          next={refreshHandler}
          hasMore={true}
        >
          {items.map(item => (
            <li key={item.id} onClick={() => handleAction(item)}>
              <span>
                <strong>{item.title}</strong>
                {item.subtitle && item.subtitle}
              </span>
              <i className={`fas ${item.status || 'fa-chevron-right'}`}></i>
            </li>
          ))}
        </InfiniteScroll>
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
