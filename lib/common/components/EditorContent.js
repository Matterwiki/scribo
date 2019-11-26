import React from 'react';
import styled from 'styled-components';

const StyledEditorContent = styled.div`
  margin: 0;
  min-height: 500px;
  font-size: 15px;
  padding-left: 10px;
  display: flex;
`;

export default function EditorContent ({ children, ...props }) {
  return <StyledEditorContent {...props}>{children}</StyledEditorContent>;
}
