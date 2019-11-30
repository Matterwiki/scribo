import { Editor } from 'slate'

const isMarkActive = (editor, type) => {
  const [mark] = Editor.marks(editor, { match: { type }, mode: 'universal' })
  return !!mark
}

/**
 * A plugin that adds mark behavior to the editor
 *
 * @param {Editor} editor - slate editor interface
 */
export const withMarkBehavior = editor => {
  const { exec } = editor

  editor.isMarkActive = isMarkActive.bind(this, editor)

  editor.exec = command => {
    if (command.type === 'toggle_mark') {
      const { mark } = command
      const cmd = editor.isMarkActive(mark) ? 'remove_mark' : 'add_mark'
      editor.exec({ type: cmd, mark: { type: mark } })
      return
    }

    exec(command)
  }

  return editor
}
