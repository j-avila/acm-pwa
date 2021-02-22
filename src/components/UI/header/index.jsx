import React from 'react'
import { Wrapper } from './styles'
import PropTypes from 'prop-types'
import Menu from '../menu'

const Header = props => {
  const { title, user, menu, menuItems } = props
  return (
    <Wrapper menu={menu}>
      <div className='head'>
        <h2 className='title'>{title}</h2>
        {menu && <Menu items={menuItems} />}
      </div>
      {user && (
        <div className='user'>
          <h3>{user.name}</h3>
          <p>
            <strong>{user.role}</strong>- id: {user.id}
          </p>
        </div>
      )}
    </Wrapper>
  )
}

Header.propTypes = {
  title: PropTypes.string,
  menu: PropTypes.bool,
  menuItems: PropTypes.array,
  user: PropTypes.object
}

export default Header
