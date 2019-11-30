import React, { useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { createEditor } from 'slate'
import { Slate, withReact } from 'slate-react'

import { Container } from './Container'
import { EditorContent } from './EditorContent'
import { Editor } from './Editor'
import { Toolbar } from './Toolbar/Toolbar'
import { Mark } from './Mark'

import { ScriboContext } from '../context'
import { withBlockBehavior } from '../plugins/withBlockBehavior'
import { withMarkBehavior } from '../plugins/withMarkBehavior'

import { WYSIWYG_DEFAULTS, MARK_HOTKEY_FNS } from '../constants'

/**
 * Sets up the base slate editor instance with all possible overrides
 */
const setupEditor = () => (
  // Add block node behavior
  withBlockBehavior(
    // Add mark behavior
    withMarkBehavior(
    // Add react behavior
      withReact(
      // Create the base editor from slate
        createEditor()
      )
    ))
)

/**
 * Renders the mark elements
 */
const renderMark = props => <Mark {...props} />

/**
 * Drop-in WYSYIWYG editor
 */
export const WYSIWYGEditor = ({
  buttonActiveColor,
  buttonIconSize,
  buttonDefaultColor,
  editorDefaultValue,
  editorPlaceholder
}) => {
  const editor = useMemo(setupEditor, [])
  const renderMarkStrategy = useCallback(renderMark, [])

  const handleKeyDown = (e) => {
    const { type } = MARK_HOTKEY_FNS.find(m => m.fn(e)) || {}
    if (!type) return

    e.preventDefault()
    editor.exec({
      type: 'toggle_mark',
      mark: type
    })
  }

  return (
    <ScriboContext.Provider value={{
      buttonActiveColor,
      buttonDefaultColor,
      buttonIconSize
    }}
    >
      <Slate
        editor={editor}
        defaultValue={editorDefaultValue}
      >
        <Container>
          <Toolbar />
          <EditorContent>
            <Editor
              renderMark={renderMarkStrategy}
              placeholder={editorPlaceholder}
              spellCheck
              autoFocus
              onKeyDown={handleKeyDown}
            />
          </EditorContent>
        </Container>
      </Slate>
    </ScriboContext.Provider>
  )
}

const {
  BUTTON_ACTIVE_COLOR,
  BUTTON_ICON_SIZE,
  BUTTON_COLOR,
  EDITOR_EMPTY_VALUE,
  EDITOR_PLACEHOLDER
} = WYSIWYG_DEFAULTS

WYSIWYGEditor.defaultProps = {
  buttonActiveColor: BUTTON_ACTIVE_COLOR,
  buttonIconSize: BUTTON_ICON_SIZE,
  buttonDefaultColor: BUTTON_COLOR,
  editorDefaultValue: EDITOR_EMPTY_VALUE,
  editorPlaceholder: EDITOR_PLACEHOLDER
}

WYSIWYGEditor.propTypes = {
  buttonActiveColor: PropTypes.string,
  buttonIconSize: PropTypes.number,
  buttonDefaultColor: PropTypes.string,
  editorDefaultValue: PropTypes.array,
  editorPlaceholder: PropTypes.string
}
