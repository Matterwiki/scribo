import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { useScribo } from '../../context'

const StyledButton = styled.button`
  background: transparent;
  border: none;
  box-sizing: content-box;
  color: ${props => (props.active ? props.activeColor : props.defaultColor)};
  cursor: pointer;
  font-size: 24px;
  margin: 0.2em;
  max-width: 20px;
  user-select: none;
  &:hover {
    color: ${props => props.activeColor}
  }
  &:focus {
    outline: none;
  }
`

/**
 * Button abstraction which is used as the base for all toolbar buttons
 */
export const Button = ({ children, active, icon: Icon, ...props }) => {
  const { buttonActiveColor, buttonDefaultColor, buttonIconSize } = useScribo()

  return (
    <StyledButton active={active} activeColor={buttonActiveColor} defaultColor={buttonDefaultColor} {...props}>
      {Icon && <Icon size={buttonIconSize} />}
      {children}
    </StyledButton>
  )
}

Button.defaultProps = {
  active: false,
  icon: null
}

Button.propTypes = {
  active: PropTypes.bool.isRequired,
  icon: PropTypes.func
}
