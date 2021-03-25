import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Card from '../card'
import Button from '../button'
import ChatBubble from './ChatBubble'
import { Row, Message, ChatWrapper, FileAdd, ActionArea } from './styles'
import { useSelector } from 'react-redux'

const ChatCard = props => {
  const hiddenFileInput = useRef(null)
  const { items } = props
  const loading = useSelector(({ loading }) => loading)
  const [user, setUser] = useState({ name: 'rigoberto', id: 1 })
  const [location, setLocation] = useState('')
  const [actions, openActions] = useState()
  const [message, setMessage] = useState({
    event_book: '',
    message: '',
    coordinates: '',
    attached: ''
  })

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

  // enconde img to base64
  const handleImg = e => {
    console.log('file to upload:', e.target.files[0])
    let file = e.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = _handleReaderLoaded.bind(this)
      reader.readAsBinaryString(file)
    }
  }

  const _handleReaderLoaded = readerEvt => {
    let binaryString = readerEvt.target.result
    setMessage({ ...message, attached: btoa(binaryString) })
  }

  const handleMessage = e => {
    e.prevent.default()
    console.log(message)
  }

  useEffect(() => {
    location.hasOwnProperty('coords') &&
      setMessage({ ...message, coordinates: location.coords })
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
        ) : items.length <= 0 ? (
          <span>Comienza por escribir un mensaje</span>
        ) : loading ? (
          <i class='fas fa-spinner fa-spin fa-3x'></i>
        ) : (
          <i class='fas fa-spinner fa-spin'></i>
        )}
      </ChatWrapper>
      <Message onSubmit={e => handleMessage(e)}>
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
                  typeof='.jepg, .png, .jpg'
                  style={{ display: 'none' }}
                  ref={hiddenFileInput}
                  onChange={e => handleImg(e)}
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
        <input
          type='text'
          onChange={e => setMessage({ ...message, message: e.target.value })}
        />
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
