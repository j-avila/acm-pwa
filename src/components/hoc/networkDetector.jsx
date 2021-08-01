import React, { Component } from 'react'
import Button from '../UI/button'
import ThemeWrapper from './styledTheme'
import { MessageBlock, NetworkWatcher } from './styles'

const netWrapper = ComposedComponent => {
  class NetworkDetector extends Component {
    state = {
      isDisconnected: false
    }

    componentDidMount() {
      this.handleConnectionChange()
      window.addEventListener('online', this.handleConnectionChange)
      window.addEventListener('offline', this.handleConnectionChange)
    }

    componentWillUnmount() {
      window.removeEventListener('online', this.handleConnectionChange)
      window.removeEventListener('offline', this.handleConnectionChange)
    }

    handleConnectionChange = () => {
      const condition = navigator.onLine ? 'online' : 'offline'
      if (condition === 'online') {
        const webPing = setInterval(() => {
          fetch(`${process.env.REACT_APP_DEV_API_URL}/api`, {
            mode: 'cors'
          })
            .then(() => {
              this.setState({ isDisconnected: false }, () => {
                return clearInterval(webPing)
              })
            })
            .catch(() => this.setState({ isDisconnected: true }))
        }, 2000)
        return
      }

      return this.setState({ isDisconnected: true })
    }

    render() {
      const { isDisconnected } = this.state
      return (
        <ThemeWrapper>
          {isDisconnected && (
            <NetworkWatcher>
              <MessageBlock className='internet-error'>
                <p>Estas trabajando en el modo sin conexión</p>
              </MessageBlock>
            </NetworkWatcher>
          )}
          <ComposedComponent {...this.props} />
        </ThemeWrapper>
      )
    }
  }

  return NetworkDetector
}

export default netWrapper
