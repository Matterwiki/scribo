import isHotkey from 'is-hotkey'

/**
 * Default values for the WYSIWYG editor
 */
export const WYSIWYG_DEFAULTS = {
  BUTTON_ACTIVE_COLOR: '#ff0066',
  BUTTON_ICON_SIZE: 15,
  BUTTON_COLOR: '#393e41',
  EDITOR_EMPTY_VALUE: [
    {
      type: 'paragraph',
      children: []
    }
  ],
  EDITOR_PLACEHOLDER: 'Start typing...'
}

/**
 * Marks in slate
 */
export const MARK_NAMES = {
  BOLD: 'bold',
  ITALIC: 'italic',
  UNDERLINED: 'underlined',
  CODE: 'code',
  STRIKETHROUGH: 'strikethrough'
}

/**
 * A constant map which is used for applying mark formatting, given a keyboard combination.
 * `fn` property is a predefined function that checks if the current `KeyboardEvent` matches the keyboard combo.
 */
export const MARK_HOTKEY_FNS = [
  { fn: isHotkey('mod+b'), type: MARK_NAMES.BOLD },
  { fn: isHotkey('mod+i'), type: MARK_NAMES.ITALIC },
  { fn: isHotkey('mod+u'), type: MARK_NAMES.UNDERLINED },
  { fn: isHotkey('mod+`'), type: MARK_NAMES.CODE },
  { fn: isHotkey('mod+shift+s'), type: MARK_NAMES.STRIKETHROUGH }
]
