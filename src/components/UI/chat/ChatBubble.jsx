import React from 'react'
import { Bubble } from './styles'

const ChatBubble = props => {
  const { direction, children, isUser, provName } = props
  return (
    <Bubble
      className={
        direction === 'flex-start'
          ? 'leftSided'
          : direction === 'notification'
          ? 'notification'
          : 'rightSided'
      }
    >
      <h4>{isUser ? `Tú` : provName}</h4>
      {direction === 'notification' && <i className='fa fa-chevron-right' />}
      {children}
    </Bubble>
  )
}

export default ChatBubble
