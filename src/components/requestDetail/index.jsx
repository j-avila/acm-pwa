import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChats, setMessage } from '../../store/actions/requests'
import UserWrapper from '../hoc/userWrapper'
import Chat from '../UI/chat'
import { CeladorSection, DetailsWrapper } from './styles'

const RequestDetail = props => {
  const { location } = props
  const dispatch = useDispatch()
  const request = useSelector(({ requests }) => requests)
  const [reqDetails, setDetails] = useState({
    event_book: location.state.id,
    title: '',
    chats: []
  })
  const handleForm = form => {
    dispatch(setMessage(form))
  }

  // event handlers
  useEffect(() => {
    dispatch(getChats('605b283df4b0620022fcce77'))
  }, [])

  useEffect(() => {
    console.log(request.details)
    request.hasOwnProperty('details') &&
      setDetails({
        ...reqDetails,
        title: request.details.event.subject,
        messages: request.details.messages
      })
  }, [request.details])

  return (
    <UserWrapper pathName='Detalle de Solicitud'>
      <DetailsWrapper>
        <CeladorSection>
          <h1>{reqDetails.title}</h1>
        </CeladorSection>
        <Chat
          id={reqDetails.event_book}
          items={reqDetails.messages}
          msgAction={handleForm}
        />
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
    id: 2,
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
    id: 4,
    userId: 12,
    user: 'grimaldo ruiz',
    status: 'read',
    body:
      'est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et'
  }
  // {
  //   postId: 1,
  //   id: null,
  //   userId: null,
  //   user: null,
  //   status: 'fa-chevron-left',
  //   body: 'Traspasado al area administrativa'
  // }
]
