import React from "react";

import BlockQuoteIcon from "quill-icons/lib/icons/blockquote";

import { hasBlock, addOrRemoveBlock } from "../../utils";

import ToolbarButton from "../../components/ToolbarButton";
import BlockQuoteNode from "./BlockQuoteNode";

export const BLOCK_TYPE = "blockquote";

export function BlockQuoteButton({ value, onChange, ...props }) {
    return (
        <ToolbarButton
            active={hasBlock(value, BLOCK_TYPE)}
            icon={BlockQuoteIcon}
            onClick={(e) => onChange(addOrRemoveBlock(value, BLOCK_TYPE))}
            {...props}
        />
    );
}

export function BlockQuotePlugin(options) {
    return {
        renderNode({ node, attributes, children }) {
            switch (node.type) {
                case BLOCK_TYPE:
                    return <BlockQuoteNode {...attributes}>{children}</BlockQuoteNode>;
            }
        }
    };
}
