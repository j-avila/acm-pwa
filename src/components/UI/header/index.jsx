import React from 'react'
import { useHistory } from 'react-router-dom'
import { Wrapper } from './styles'
import PropTypes from 'prop-types'
import Menu from '../menu'
import Avatar from '../avatar'

const Header = props => {
  const { title, user, menu, menuItems, notifications, back } = props
  const history = useHistory()

  return (
    <Wrapper menu={menu}>
      <div className='head'>
        {back && (
          <i
            className='fas fa-arrow-left back'
            onClick={() => history.goBack()}
          ></i>
        )}
        <h2 className='title'>{title}</h2>
        <div className='action-zone'>
          {notifications && (
            <i
              className='fa fa-info-circle notification-but'
              onClick={() => history.push('/notificaciones')}
            />
          )}
          {menu && <Menu items={menuItems} />}
        </div>
      </div>
      {user && (
        <div className='user'>
          <div className='content'>
            <h3>Bienvenido, {user.acm.name}</h3>
            <p>
              <strong>{`Tu celador es ${
                user.watchman && user.watchman.name
              }`}</strong>
            </p>
          </div>
          <Avatar
            image={user.watchman && user.watchman.picture}
            alt='celador'
          />
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
