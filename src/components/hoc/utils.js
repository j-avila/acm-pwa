import { io } from 'socket.io-client'
export const checkThemeProp = (theme, prop) =>
  // eslint-disable-next-line no-prototype-builtins
  theme.hasOwnProperty(prop) ? theme[prop] : prop

// Socket connect
export const socket = io('wss://api.acanalmaule.cl/')

// check the role of the user
export const checkRole = (session, role = 'irrigator') => {
  if (session) {
    const output = session.hasOwnProperty('role') && session.role.name === role
    return output
  } else {
    window.location.replace('/')
  }
}

export const scrollTo = id => {
  const element = document.getElementById(id)
  window.scroll({
    behavior: 'smooth',
    left: 0,
    top: element.offsetTop
  })
}

export const removeDuplicates = (data, key) => {
  if (data) {
    return [...new Map(data.map(item => [key(item), item])).values()]
  } else {
    return []
  }
}
