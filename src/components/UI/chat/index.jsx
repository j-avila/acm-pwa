import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Card from '../card'
import Button from '../button'
import ChatBubble from './ChatBubble'
import { Row, Message, ChatWrapper, FileAdd, ActionArea } from './styles'

const ChatCard = props => {
  const hiddenFileInput = useRef(null)
  const { items } = props
  const [user, setUser] = useState({ name: 'rigoberto', id: 1 })
  const [location, setLocation] = useState()
  const [actions, openActions] = useState()

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => setLocation(pos))
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }

  const handleFileClick = () => {
    hiddenFileInput.current.click()
  }

  const getFile = event => {
    const fileUploaded = event.target.files[0]
    console.log(fileUploaded)
  }

  useEffect(() => {
    console.log(location)
  }, [location])

  return (
    <Card>
      <ChatWrapper>
        {items.length >= 1 ? (
          items.map(message => (
            <Row
              key={message.id}
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
        {actions && (
          <ActionArea>
            <span>
              <Button background='primary' display='block'>
                <i className='fas fa-camera'></i>
              </Button>
              Agregar Foto
            </span>
            <span>
              <Button
                display='block'
                background='rgba(87,162,198,1)'
                onClick={() => handleFileClick()}
                onChange={e => getFile(e)}
              >
                <i className='fas fa-paperclip'></i>
                <input
                  type='file'
                  style={{ display: 'none' }}
                  ref={hiddenFileInput}
                />
              </Button>
              Agregar Archivo
            </span>
            <span>
              <Button
                background='secondary'
                onClick={() => getLocation()}
                display='block'
              >
                <i className='fas fa-crosshairs'></i>
              </Button>
              Agregar Ubicación
            </span>
          </ActionArea>
        )}
        <FileAdd onClick={() => openActions(!actions)}>
          <i className='fas fa-plus'></i>
        </FileAdd>
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
