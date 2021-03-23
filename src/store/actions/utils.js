export const options = {
  // mode: 'cors',
  // cache: 'default',
  'Content-Type': 'application/json'
}

export const apiUrl = 'https://api.acanalmaule.cl'

export const getAuth = () => {
  const token = () => localStorage.getItem('session')

  const auth = {
    headers: {
      ...options,
      Authorization: `Bearer ${token()}`
    }
  }

  return auth
}
