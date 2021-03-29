import React from 'react'
import Theme from '../../hoc/styledTheme'
import { GhostBar, GhostWrapper } from './styles'

export const GhostLine = props => (
  <GhostBar
    className={props.className}
    height={props.height}
    width={props.width}
    radius={props.radius}
    circle={props.circle}
    opacity={props.opacity}
  />
)

export const GhostLoader = () => {
  return (
    <Theme>
      <GhostWrapper>
        <div className='bars'>
          <GhostLine />
          <GhostLine width='60%' />
          <GhostLine width='40%' />
        </div>
        <GhostLine
          className='circle'
          height='60px'
          width='60px'
          radius='50%'
          circle
        />
      </GhostWrapper>
    </Theme>
  )
}

GhostLine.defaultProps = {
  width: '100%',
  height: '13px',
  radius: '8px',
  opacity: '0.4'
}
