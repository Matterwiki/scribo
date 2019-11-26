export const NODE_TYPES = {
  // Block types
  BLOCK_QUOTE: 'blockquote',
  CODE_BLOCK: 'code-block',
  HEADING_ONE: 'heading-one',
  HEADING_TWO: 'heading-two',
  HEADING_THREE: 'heading-three',
  NUMBERED_LIST: 'numbered-list',
  BULLETED_LIST: 'bulleted-list',
  LIST_ITEM: 'list-item',
  PARAGRAPH: 'paragraph',
  IMAGE: 'image',

  TABLE: 'table',
  TABLE_ROW: 'table-row',
  TABLE_CELL: 'table-cell',

  // Inline types
  // TODO: Add emoji
  LINK: 'link',

  // Mark types
  CODE: 'code',
  STRIKETHROUGH: 'strikethrough',
  BOLD: 'bold',
  ITALIC: 'italic',
  UNDERLINED: 'underlined'
};

export const EMPTY_EDITOR_VALUE = {
  document: {
    nodes: [
      {
        object: 'block',
        type: NODE_TYPES.PARAGRAPH,
        nodes: [{ object: 'text', text: '' }]
      }
    ]
  }
};

export const DEFAULT_NODE = NODE_TYPES.PARAGRAPH;
