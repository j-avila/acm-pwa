import React from 'react'
import Tabs, { Panel } from './index'
import Button from '../button/Button'

const options = {
  title: 'tabs',
  component: Tabs
}

export const BasicExample = () => (
  <Tabs selected={0}>
    <Panel title='first'>
      <div style={{ background: 'white', padding: '1rem' }}>item uno</div>
    </Panel>
    <Panel title='second'>
      <div style={{ background: 'white', padding: '1rem' }}>item dos</div>
    </Panel>
  </Tabs>
)

export const WithContentInside = () => (
  <Tabs selected={1}>
    <Panel title='one'>
      <div style={{ background: 'white', padding: '1rem' }}>
        <h3>Some heading</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae,
          ex quisquam corrupti non at ullam, architecto vero quidem tempore
          numquam unde iusto. Accusamus illum autem dolorem, provident ad quos
          temporibus?
        </p>
      </div>
    </Panel>
    <Panel title='two'>
      <div style={{ background: 'white', padding: '1rem', display: 'grid' }}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
          officiis enim tempora nesciunt odio quibusdam aperiam! Quod inventore
          harum blanditiis quae ratione asperiores, iusto vitae optio ex dolore
          nesciunt consequuntur.
        </p>
        <Button>some action</Button>
      </div>
    </Panel>
  </Tabs>
)

export default options
