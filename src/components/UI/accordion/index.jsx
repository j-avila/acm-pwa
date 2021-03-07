import React from 'react'
import { useState } from 'react'
import { AccordionWrapper, Content } from './styles'

const Accordion = props => {
  const { children, title, openend } = props
  const [open, setOpen] = useState(openend)

  return (
    <AccordionWrapper>
      <header onClick={() => setOpen(!open)}>
        <h3>{title}</h3>
        <i className={`fas ${open ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
      </header>
      {open && <Content open={open}>{children}</Content>}
    </AccordionWrapper>
  )
}

Accordion.defaultProps = {
  title: 'Open me',
  openend: false
}

export default Accordion
