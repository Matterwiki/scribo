import React from 'react'
import { useSlate } from 'slate-react'
import PropTypes from 'prop-types'

import { Button } from './Button'

/**
 * Base toolbar button component for Mark type actions
 */
export const MarkButton = ({ type, icon, ...props }) => {
  const editor = useSlate()

  // Setup a click event that cannot be overridden!
  const handleClick = e => {
    e.preventDefault()
    editor.exec({ type: 'toggle_mark', mark: type })
  }

  const active = editor.isMarkActive(type)

  return (
    <Button
      active={active}
      icon={icon}
      {...props}

      onClick={handleClick}
    />
  )
}

MarkButton.propTypes = {
  type: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired
}
