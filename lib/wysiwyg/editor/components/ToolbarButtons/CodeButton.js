import React from 'react';

import { FaCode } from 'react-icons/fa';

import ToolbarButton from '../../../../common/components/ToolbarButton';

import { NODE_TYPES } from '../../../../common/constants';

export const MARK_TYPE = NODE_TYPES.CODE;
export const KEYBOARD_COMBINATION = 'mod+alt+c';

export default function CodeToolbarButton ({ value, editor, ...props }) {
  return (
    <ToolbarButton
      icon={FaCode}
      active={editor.hasMark(MARK_TYPE)}
      onClick={e => editor.addOrRemoveMark(MARK_TYPE)}
      {...props}
    />
  );
}
