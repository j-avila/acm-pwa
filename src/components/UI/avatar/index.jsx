import React from 'react'
import { UserPicture } from './styles'

const Avatar = props => {
  const { image, altTxt, onClick, onChange } = props
  return (
    <UserPicture>
      <img src={image} onClick={onClick} onChange={onChange} alt={altTxt} />
    </UserPicture>
  )
}

Avatar.defaultProps = {
  image:
    'https://schooloflanguages.sa.edu.au/wp-content/uploads/2017/11/placeholder-profile-sq-300x300.jpg',
  altTxt: 'foto de perfil'
}

export default Avatar
