import React from 'react'
import ChatCard from '.'

const options = {
  title: 'chat',
  component: ChatCard
}

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

export const BasicUsage = () => <ChatCard items={dummy} />

export default options
