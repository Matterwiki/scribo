import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

import ToolbarButton from '../../../../common/components/ToolbarButton';

import { NODE_TYPES } from '../../../../common/constants';

const BLOCK_TYPE = NODE_TYPES.BLOCK_QUOTE;

export default function BlockQuoteButton ({
  value,
  onChange,
  editor,
  ...props
}) {
  return (
    <ToolbarButton
      active={editor.hasBlock(BLOCK_TYPE)}
      icon={FaQuoteLeft}
      onClick={e => editor.addOrRemoveBlock(BLOCK_TYPE)}
      {...props}
    />
  );
}
