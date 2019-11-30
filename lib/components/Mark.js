import React from 'react'
import styled from 'styled-components'

import { MARK_NAMES } from '../constants'

const { BOLD, ITALIC, UNDERLINED, CODE, STRIKETHROUGH } = MARK_NAMES

const StyledCode = styled.code`
  padding: 0.2em 0.4em;
  margin: 0;
  background-color: #e7e7e7;
  border-radius: 3px;
`

const StyledSpan = styled.span`
  text-decoration: line-through;
`

export const Mark = ({ attributes, children, mark }) => {
  switch (mark.type) {
    case BOLD:
      return <strong {...attributes}>{children}</strong>
    case CODE:
      return <StyledCode {...attributes}>{children}</StyledCode>
    case ITALIC:
      return <em {...attributes}>{children}</em>
    case UNDERLINED:
      return <u {...attributes}>{children}</u>
    case STRIKETHROUGH:
      return <StyledSpan {...attributes}>{children}</StyledSpan>
  }
}
