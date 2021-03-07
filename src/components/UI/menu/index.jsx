import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { List, MenuWrapper } from './styles'
import { useHistory } from 'react-router'

const Menu = props => {
  const { items } = props
  const history = useHistory()
  const [open, setOpen] = useState(null)
  return (
    <MenuWrapper>
      <button
        className='fas fa-align-left'
        onClick={() => setOpen(!open)}
      ></button>
      {items && open && (
        <List>
          {items.map((item, index) => (
            <li key={index} onClick={() => history.push(item.path)}>
              {item.name}
            </li>
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
