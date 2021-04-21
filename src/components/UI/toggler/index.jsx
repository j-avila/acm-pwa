import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Theme from '../../hoc/styledTheme'
import { DataList, TogglerWrapper, Trigger } from './styles'
import { useDispatch } from 'react-redux'
import * as type from '../../../store/reducers/types'

const Toggler = props => {
  const dispatch = useDispatch()
  const { items, activeCode } = props
  const [openSelector, setSelector] = useState()
  const [selected, setSelected] = useState()

  const handleCode = code => {
    setSelected(code)
    setSelector(false)
  }

  useEffect(() => {
    dispatch({ type: type.SET_CODE, codeActive: selected })
    console.log(selected)
  }, [selected])

  return (
    <Theme>
      <TogglerWrapper>
        <Trigger onClick={() => setSelector(!openSelector)}>
          <h2>{`Código actual: ${activeCode}`}</h2>
          <i
            className={`fas ${
              openSelector ? 'fa-chevron-down' : 'fa-chevron-up'
            }`}
          />
        </Trigger>
        {openSelector && (
          <DataList>
            {items && items.length >= 1
              ? items.map(li => (
                  <li
                    key={li.code}
                    value={li.code}
                    onClick={() => handleCode(li.code)}
                  >
                    {li.code}
                  </li>
                ))
              : ''}
          </DataList>
        )}
      </TogglerWrapper>
    </Theme>
  )
}

Toggler.propTypes = {
  items: PropTypes.array,
  activeCode: PropTypes.string
}

Toggler.defaultProps = {
  items: [],
  activeCode: 'ningun codigo seleccionado'
}

export default Toggler
