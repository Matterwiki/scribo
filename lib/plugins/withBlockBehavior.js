import { Editor } from 'slate'

const isBlockActive = (editor, type) => {
  const [match] = Editor.nodes(editor, { match: { type } })
  return !!match
}

/**
 * A plugin that adds block node capabilities to the editor
 *
 * @param {Editor} editor - slate editor interface
 */
export const withBlockBehavior = editor => {
  const { exec } = editor

  editor.isBlockActive = isBlockActive.bind(this, editor)

  editor.exec = command => {
    if (command.type === 'toggle_block') {
      const { block: type } = command
      const isActive = editor.isBlockActive(type)
      const isListType = type === 'bulleted-list' || type === 'numbered-list'
      Editor.unwrapNodes(editor, { match: { type: 'bulleted-list' } })
      Editor.unwrapNodes(editor, { match: { type: 'numbered-list' } })

      const newType = isActive ? 'paragraph' : isListType ? 'list-item' : type
      Editor.setNodes(editor, { type: newType })

      if (!isActive && isListType) {
        Editor.wrapNodes(editor, { type, children: [] })
      }

      return
    }

    exec(command)
  }

  return editor
}
