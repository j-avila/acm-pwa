import React from 'react'
import { Bubble } from './styles'

const ChatBubble = props => {
  const { direction, children } = props
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
      {direction === 'notification' && <i className='fa fa-chevron-right' />}
      {children}
    </Bubble>
  )
}

export default ChatBubble
