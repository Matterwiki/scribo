import React from "react";
import styled from "styled-components";

import RenderNodePlugin from "../renderNode";
import ClearListFormattingPlugin from "./clearListFormatting";
import { NODE_TYPES } from "../../constants";

export * from "./ListButton";

const StyledParagraph = styled.p`
    margin: 12px 0 0 0;
`;

export function ListPlugins(options) {
    return [
        RenderNodePlugin({
            node: function BullettedListNode({ children, attributes }) {
                return <ul {...attributes}>{children}</ul>;
            },
            nodeType: NODE_TYPES.BULLETTED_LIST
        }),
        RenderNodePlugin({
            node: function NumberedListNode({ children, attributes }) {
                return <ol {...attributes}>{children}</ol>;
            },
            nodeType: NODE_TYPES.NUMBERED_LIST
        }),
        RenderNodePlugin({
            node: function ListItem({ children, attributes }) {
                return (
                    <li {...attributes}>
                        <StyledParagraph>{children}</StyledParagraph>
                    </li>
                );
            },
            nodeType: NODE_TYPES.LIST_ITEM
        }),
        ClearListFormattingPlugin()
    ];
}
