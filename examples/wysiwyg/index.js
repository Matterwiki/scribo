import React from 'react'
import { render } from 'react-dom'

import { WYSIWYGEditor } from '../../lib/index'

const initialValue = [
  {
    type: 'paragraph',
    children: [
      {
        text: 'A line of text in a paragraph.',
        marks: []
      }
    ]
  }
]

const RichTextEditorExample = () => (
  <WYSIWYGEditor
    editorDefaultValue={initialValue}
    buttonActiveColor='limegreen'
    buttonDefaultColor='#393e41'
    buttonIconSize={15}
  />
)

render(<RichTextEditorExample />, document.getElementById('root'))

// Only works for dev mode
// https://parceljs.org/hmr.html
// if (module.hot) {
//   module.hot.accept()
// }
