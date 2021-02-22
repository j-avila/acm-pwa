/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Wrapper from './styles'
const Tabs = props => {
  const { selected, children, fullWidth } = props
  const [tabs, setTabs] = useState()
  const [selectedTab, setSelectedTab] = useState(0)

  useEffect(() => {
    setSelectedTab(selected)
  }, [selected])

  useEffect(() => {
    if (children.length) {
      setTabs(
        children.map((elem, index) => {
          const style = index === selectedTab ? 'selected' : ''
          // eslint-disable-next-line no-prototype-builtins
          const available = elem.props.hasOwnProperty('available')
            ? elem.props.available
            : true

          if (available) {
            return (
              <li
                className={style}
                key={index}
                data-testid='tab'
                onClick={() => setSelectedTab(index)}
              >
                <i className={`fa ${elem.props.icon}`} />
                {elem.props.title}
              </li>
            )
          } else {
            return ''
          }
        })
      )
    } else {
      setTabs(
        <li className='selected' data-testid='tab' key={0}>
          {children.props.title}
        </li>
      )
    }
  }, [selectedTab])

  return (
    <Wrapper role='tabpanel' fullWidth={fullWidth}>
      <ul className='inline'>{tabs}</ul>
      {children.length ? children[selectedTab] : children}
    </Wrapper>
  )
}

export const Panel = props => {
  const { children } = props
  return children
}

Tabs.defaultProps = {
  fullWidth: '100%'
}

export default Tabs
