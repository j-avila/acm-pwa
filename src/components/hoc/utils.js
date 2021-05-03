import { io } from 'socket.io-client'
export const checkThemeProp = (theme, prop) =>
  // eslint-disable-next-line no-prototype-builtins
  theme.hasOwnProperty(prop) ? theme[prop] : prop

// Socket connect
export const socket = io('wss://api.acanalmaule.cl/')

// check the role of the user
export const checkRole = (session, role = 'irrigator') =>
  session.hasOwnProperty('role') && session.role.name === role
