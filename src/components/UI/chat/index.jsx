import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Card from '../card'
import Button from '../button'
import ChatBubble from './ChatBubble'
import { Row, Message, ChatWrapper } from './styles'

const ChatCard = props => {
  const { items } = props
  const [user, setUser] = useState({ name: 'rigoberto', id: 1 })
  return (
    <Card>
      <ChatWrapper>
        {items.length >= 1 ? (
          items.map(message => (
            <Row
              direction={
                message.userId !== user.id
                  ? 'flex-start'
                  : !message.userId
                  ? 'notification'
                  : 'flex-end'
              }
            >
              <ChatBubble
                direction={
                  !message.userId
                    ? 'notification'
                    : message.userId !== user.id
                    ? 'flex-start'
                    : 'flex-end'
                }
              >
                {message.body}
              </ChatBubble>
            </Row>
          ))
        ) : (
          <span>Comienza por escribir un mensaje</span>
        )}
      </ChatWrapper>
      <Message>
        <input type='text' />
        <Button background='transparent'>
          <i className='fas fa-paper-plane'></i>
        </Button>
      </Message>
    </Card>
  )
}

ChatCard.propTypes = {
  items: PropTypes.array
}

ChatCard.defaultProps = {
  items: []
}

export default ChatCard
