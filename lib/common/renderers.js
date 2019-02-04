import React from "react";
import {
    BoldMark,
    ItalicsMark,
    CodeMark,
    StrikeThroughMark,
    UnderlinedMark,
    ParagraphNode,
    BlockQuoteNode,
    BulletedListNode,
    NumberedListNode,
    ListItem,
    CodeBlockNode,
    LinkInline,
    HeadingOneNode,
    HeadingTwoNode,
    HeadingThreeNode,
    Table,
    TableRow,
    TableCell,
    ImageNode
} from "./components/EditorNodes/index";

import { NODE_TYPES } from "./constants";

export function renderMark(props, editor, next) {
    const { mark, children } = props;
    switch (mark.type) {
        case NODE_TYPES.BOLD:
            return <BoldMark>{children}</BoldMark>;
        case NODE_TYPES.ITALIC:
            return <ItalicsMark>{children}</ItalicsMark>;
        case NODE_TYPES.CODE:
            return <CodeMark>{children}</CodeMark>;

        case NODE_TYPES.STRIKETHROUGH:
            return <StrikeThroughMark>{children}</StrikeThroughMark>;
        case NODE_TYPES.UNDERLINED:
            return <UnderlinedMark>{children}</UnderlinedMark>;
        default:
            return next();
    }
}

export function renderNode(props, editor, next) {
    const { node, attributes, children } = props;
    switch (node.type) {
        case NODE_TYPES.PARAGRAPH:
            return <ParagraphNode {...props} />;

        case NODE_TYPES.BLOCK_QUOTE:
            return <BlockQuoteNode {...attributes}>{children}</BlockQuoteNode>;

        case NODE_TYPES.BULLETED_LIST:
            return <BulletedListNode {...attributes}>{children}</BulletedListNode>;

        case NODE_TYPES.NUMBERED_LIST:
            return <NumberedListNode {...attributes}>{children}</NumberedListNode>;

        case NODE_TYPES.LIST_ITEM:
            return <ListItem {...attributes}>{children}</ListItem>;

        case NODE_TYPES.CODE_BLOCK:
            return <CodeBlockNode {...attributes}>{children}</CodeBlockNode>;

        case NODE_TYPES.LINK: {
            const href = node.data.get("href");
            return <LinkInline href={href}>{children}</LinkInline>;
        }

        case NODE_TYPES.HEADING_ONE:
            return <HeadingOneNode {...attributes}>{children}</HeadingOneNode>;

        case NODE_TYPES.HEADING_TWO:
            return <HeadingTwoNode {...attributes}>{children}</HeadingTwoNode>;

        case NODE_TYPES.HEADING_THREE:
            return <HeadingThreeNode {...attributes}>{children}</HeadingThreeNode>;

        case NODE_TYPES.TABLE:
            return <Table {...attributes}>{children}</Table>;

        case NODE_TYPES.TABLE_ROW:
            return <TableRow {...attributes}>{children}</TableRow>;

        case NODE_TYPES.TABLE_CELL:
            return <TableCell {...attributes}>{children}</TableCell>;

        case NODE_TYPES.IMAGE:
            return <ImageNode {...props} />;
        default:
            return next();
    }
}
