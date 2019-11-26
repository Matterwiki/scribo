import React from 'react';
import styled from 'styled-components';

const StyledBlockQuote = styled.blockquote`
  box-sizing: border-box;
  border-left: 3px solid #e7e7e7;
  margin: 12px 0px 0px;
  font-style: italic;
  color: #707070;
  padding: 10px 15px;
`;

export default function BlockQuoteNode ({ children, attributes }) {
  return <StyledBlockQuote {...attributes}>{children}</StyledBlockQuote>;
}
