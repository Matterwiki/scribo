export const EMPTY_EDITOR_VALUE = {
    document: {
        nodes: [
            {
                object: "block",
                type: "paragraph",
                nodes: [{ object: "text", leaves: [{ object: "leaf", text: "" }] }]
            }
        ]
    }
};

export const NODE_TYPES = {
    // Block types
    BLOCK_QUOTE: "blockquote",
    CODE_BLOCK: "code-block",
    HEADING_ONE: "heading-one",
    HEADING_TWO: "heading-two",
    HEADING_THREE: "heading-three",
    NUMBERED_LIST: "numbered-list",
    BULLETTED_LIST: "bulletted-list",
    LIST_ITEM: "list-item",
    PARAGRAPH: "paragraph",
    IMAGE: "image",

    TABLE: "table",
    TABLE_ROW: "table_row",
    TABLE_CELL: "table_cell",

    // Inline types
    EMOJI: "emoji",
    LINK: "link",

    // Mark types
    CODE: "code",
    STRIKETHROUGH: "strikethrough",
    BOLD: "bold",
    ITALIC: "italic",
    UNDERLINED: "underlined"
};

export const DEFAULT_NODE = NODE_TYPES.PARAGRAPH;
