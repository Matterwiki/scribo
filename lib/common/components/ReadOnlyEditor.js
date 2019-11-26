import React from 'react';

import Editor from './Editor';
import { renderMark, renderBlock, renderInline } from '../renderers';

export default function ReadOnlyEditor ({ value }) {
  return (
    <Editor
      value={value}
      renderMark={renderMark}
      renderBlock={renderBlock}
      renderInline={renderInline}
      readOnly
    />
  );
}
