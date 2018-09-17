import React from "react";
import cx from "classnames";

import BlockQuoteIcon from "quill-icons/lib/icons/blockquote";

import { hasBlock, addOrRemoveBlock } from "../utils";

import { BlockQuote } from "../components/Node";

import ToolbarButton from "../components/ToolbarButton";
import ToolbarIcon from "../components/ToolbarIcon";

export const BLOCK_TYPE = "blockquote";

export function BlockQuoteButton({ value, onChange, className, ...props }) {
    className = cx({ active: hasBlock(value, BLOCK_TYPE) }, className);

    return (
        <ToolbarButton
            className={className}
            onClick={(e) => onChange(addOrRemoveBlock(value, BLOCK_TYPE))}
            {...props}>
            <ToolbarIcon icon={BlockQuoteIcon} />
        </ToolbarButton>
    );
}

export function BlockQuotePlugin(options) {
    return {
        renderNode({ node, attributes, children }) {
            switch (node.type) {
                case BLOCK_TYPE:
                    return <BlockQuote {...attributes}>{children}</BlockQuote>;
            }
        }
    };
}
