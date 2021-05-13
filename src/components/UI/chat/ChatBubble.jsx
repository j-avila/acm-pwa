import React from 'react'
import { Bubble } from './styles'

const ChatBubble = props => {
  const { direction, children, isUser, provName, width } = props
  return (
    <Bubble
      width={width}
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

ChatBubble.defaultProps = {}

export default ChatBubble
