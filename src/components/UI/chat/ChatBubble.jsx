import React from 'react'
import { Bubble } from './styles'

/* 
Para identificar el usuario que escribió, porque puede ser 
el usuario logueado, un celador o un tercer rol que quiera 
participar, llamese Jefe de Sección o Administrador.
Se pasa como para metro el usuario del mensaje
*/
const userName = (mUser)=>{
  const loggedUser = mUser.loggedUser;
  let name = mUser.provName;

  if(loggedUser && loggedUser.code && name != loggedUser.acm.name){
    return name;
  }else if(loggedUser && loggedUser.association_area && name != loggedUser.name){
    return name;
  }

  return null;
}

const ChatBubble = props => {
  const { direction, children, loggedUser, provName, width } = props
  const name = userName({loggedUser, provName})
  return (
    <Bubble
      width={width}
      className={
        direction === 'notification'
          ? 'notification'
          : direction === 'flex-start'
          ? 'leftSided'
          : 'rightSided'
      }
    >
      {name !== null && <h4>{name}</h4> }

      {direction === 'notification' && <i className='fa fa-chevron-right' />}
      {children}
    </Bubble>
  )
}

ChatBubble.defaultProps = {}

export default ChatBubble
