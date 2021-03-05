import React, { useRef, useState } from 'react'
import UserWrapper from '../hoc/userWrapper'
import Button from '../UI/button'
import Chat from '../UI/chat'
import { ActionArea, CeladorSection, DetailsWrapper } from './styles'

const RequestDetail = () => {
  const hiddenFileInput = useRef(null)
  const [location, setLocation] = useState()

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => setLocation(pos))
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }

  const handleFIleClick = () => {
    hiddenFileInput.current.click()
  }

  const getFile = event => {
    const fileUploaded = event.target.files[0]
    console.log(fileUploaded)
  }

  return (
    <UserWrapper>
      <DetailsWrapper>
        <CeladorSection>
          <h1>problema con la presión</h1>
          <img
            src='https://ra.ac.ae/wp-content/uploads/2017/02/user-icon-placeholder.png'
            alt='celador'
          />
        </CeladorSection>
        <Chat items={dummy} />
        <ActionArea>
          <Button background='primary'>
            <i className='fas fa-camera'></i>
          </Button>
          <Button
            background='rgba(87,162,198,1)'
            onClick={() => handleFIleClick()}
            onChange={e => getFile(e)}
          >
            <i className='fas fa-paperclip'></i>
          </Button>
          <Button background='secondary' onClick={() => getLocation()}>
            <i className='fas fa-crosshairs'></i>
          </Button>
        </ActionArea>
      </DetailsWrapper>
    </UserWrapper>
  )
}

export default RequestDetail

const dummy = [
  {
    postId: 1,
    id: 1,
    userId: 1,
    user: 'ruperto bartosevicio',
    status: 'read',
    body:
      'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium'
  },
  {
    postId: 1,
    id: null,
    userId: null,
    user: null,
    status: 'fa-chevron-left',
    body: 'traspassed to la concha de la lora'
  },
  {
    postId: 1,
    id: 3,
    userId: 12,
    user: 'grimaldo ruiz',
    status: 'read',
    body:
      'est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et'
  },
  {
    postId: 1,
    id: 3,
    userId: 12,
    user: 'grimaldo ruiz',
    status: 'read',
    body:
      'est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et'
  },
  {
    postId: 1,
    id: 3,
    userId: 12,
    user: 'grimaldo ruiz',
    status: 'read',
    body:
      'est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et'
  }
]
