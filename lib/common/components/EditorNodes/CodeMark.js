import React from 'react';
import styled from 'styled-components';

const StyledCode = styled.code`
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: #e7e7e7;
  border-radius: 3px;
`;

export default function CodeMark ({ children, attributes, className }) {
  return (
    <StyledCode className={className} {...attributes}>
      {children}
    </StyledCode>
  );
}
