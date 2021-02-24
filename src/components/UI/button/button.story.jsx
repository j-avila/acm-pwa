import React from 'react'
import Button from '.'
import { action } from '@storybook/addon-actions'

const options = {
  title: 'Button',
  component: Button,
  argTypes: {
    background: { control: 'color' }
  }
}

const Template = args => (
  <Button {...args} onClick={action('clicked')}>
    example button
  </Button>
)

export const BasicUse = Template.bind({})
BasicUse.args = {
  background: 'primary'
}

export const GradientBg = () => (
  <Button
    background='blueGradient'
    color='lime'
    onClick={action('clicked with gradient')}
    shadow
  >
    with gradient!
  </Button>
)

export default options
