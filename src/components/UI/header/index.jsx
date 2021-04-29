import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Wrapper } from './styles'
import PropTypes from 'prop-types'
import Menu from '../menu'
import Avatar from '../avatar'
import { GhostLoader } from '../ghostLoader'
import { useSelector } from 'react-redux'

const Header = props => {
  const history = useHistory()
  const loading = useSelector(({ loading }) => loading)
  const { title, user, menu, menuItems, notifications, back, onClick } = props
  const [userData, setData] = useState()

  const setUser = () => {
    const getAvatar = user => {
      let picture

      if (user.hasOwnProperty('watchman')) {
        user.watchman && (picture = user.watchman.picture)
      } else if ('picture') {
        user.picture && (picture = user.picture)
      } else {
        picture = null
      }

      return picture
    }

    const info = {
      name: user.hasOwnProperty('acm') ? user.acm.name : user.name,
      picture: getAvatar(user),
      watchman: user.watchman
    }
    setData(info)
  }

  useEffect(() => {
    // console.log(user)
    setUser()
  }, [user])

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
        {userData ? (
          <>
            <div className='content'>
              <h3>Bienvenido, {userData.name}</h3>
              {userData.watchman && (
                <p>
                  <strong>{`Tu celador es ${
                    userData.watchman.name || 'sin definir'
                  }`}</strong>
                </p>
              )}
            </div>
            <Avatar onClick={onClick} image={userData.picture} alt='celador' />
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
