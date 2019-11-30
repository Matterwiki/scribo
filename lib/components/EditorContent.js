import React from 'react'
import styled from 'styled-components'

const StyledEditorContent = styled.div`
  margin: 0;
  min-height: 500px;
  padding-left: 15px;
  display: flex;
  box-sizing: content-box;
`

export const EditorContent = ({ children, ...props }) => {
  return <StyledEditorContent {...props}>{children}</StyledEditorContent>
}
