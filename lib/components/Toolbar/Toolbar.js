import React from 'react'
import styled from 'styled-components'
import { FiBold, FiItalic, FiUnderline, FiCode } from 'react-icons/fi'
import { FaStrikethrough } from 'react-icons/fa'

import { MarkButton } from './MarkButton'

import { MARK_NAMES } from '../../constants'

const { BOLD, ITALIC, UNDERLINED, CODE, STRIKETHROUGH } = MARK_NAMES

const StyledToolbar = styled.div`
  box-sizing: content-box;
  margin: 0;
  margin-bottom: 1rem;
  padding: 10px;
  border-bottom: solid 1px #e8e6e6;
`

export const Toolbar = () => {
  return (
    <StyledToolbar>
      <MarkButton type={BOLD} icon={FiBold} title='Bold' />
      <MarkButton type={ITALIC} icon={FiItalic} title='Italic' />
      <MarkButton type={UNDERLINED} icon={FiUnderline} title='Underlined' />
      <MarkButton type={CODE} icon={FiCode} title='Code' />
      <MarkButton type={STRIKETHROUGH} icon={FaStrikethrough} title='Strikethrough' />
    </StyledToolbar>
  )
}
