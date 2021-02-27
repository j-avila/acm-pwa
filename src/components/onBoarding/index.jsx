import React from 'react'
import Slider from '@farbenmeer/react-spring-slider'

export const OnBoarding = () => {
  return (
    <Slider activeIndex={2} hasBullets>
      <div style={{ background: 'tomato', height: '100vh' }}>child 1</div>
      <div>child 2</div>
      <div>child 3</div>
    </Slider>
  )
}
