import React from 'react'
import { useHistory } from 'react-router-dom'
import { Wrapper } from './styles'
import PropTypes from 'prop-types'
import Menu from '../menu'
import Avatar from '../avatar'
import { GhostLoader } from '../ghostLoader'
import { useSelector } from 'react-redux'

const Header = props => {
  const loading = useSelector(({ loading }) => loading)
  const { title, user, menu, menuItems, notifications, back, onClick } = props
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
      <div className='user'>
        {user && user.hasOwnProperty('acm') ? (
          <>
            <div className='content'>
              <h3>Bienvenido, {user.acm.name}</h3>
              <p>
                <strong>{`Tu celador es ${
                  user.watchman && user.watchman.name
                }`}</strong>
              </p>
            </div>
            <Avatar
              onClick={onClick}
              image={user.watchman && user.watchman.picture}
              alt='celador'
            />
          </>
        ) : loading ? (
          <GhostLoader />
        ) : (
          <p>No hay nada que mostrar</p>
        )}
      </div>
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
