import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { List, MenuWrapper } from './styles'

const Menu = props => {
  const { items } = props
  const [open, setOpen] = useState(null)
  return (
    <MenuWrapper>
      <button
        className='fas fa-align-left'
        onClick={() => setOpen(!open)}
      ></button>
      {items && open && (
        <List>
          {items.map(item => (
            <li>{item.name}</li>
          ))}
        </List>
      )}
    </MenuWrapper>
  )
}

Menu.propTypes = {
  links: PropTypes.array
}

export default Menu
