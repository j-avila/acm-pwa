import React, { useRef, useState } from 'react'
import UserWrapper from '../hoc/userWrapper'
import Button from '../UI/button'
import Chat from '../UI/chat'
import { ActionArea, CeladorSection, DetailsWrapper } from './styles'

const RequestDetail = () => {
  return (
    <UserWrapper pathName='Detalle de Solicitud'>
      <DetailsWrapper>
        <CeladorSection>
          <h1>problema con la presión</h1>
        </CeladorSection>
        <Chat items={dummy} />
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
  },
  {
    postId: 1,
    id: null,
    userId: null,
    user: null,
    status: 'fa-chevron-left',
    body: 'Traspasado al area administrativa'
  }
]
