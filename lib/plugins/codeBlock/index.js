import React from "react";

import CodeBlockIcon from "quill-icons/lib/icons/code-block";

import { hasBlock, addOrRemoveBlock } from "../../utils";

import ToolbarButton from "../../components/ToolbarButton";
import CodeBlockNode from "./CodeBlockNode";

export const BLOCK_TYPE = "code-block";

export function CodeBlockButton({ value, onChange, ...props }) {
    return (
        <ToolbarButton
            active={hasBlock(value, BLOCK_TYPE)}
            icon={CodeBlockIcon}
            onClick={(e) => onChange(addOrRemoveBlock(value, BLOCK_TYPE))}
            {...props}
        />
    );
}

export function CodeBlockPlugin(options) {
    return {
        renderNode({ node, attributes, children }) {
            switch (node.type) {
                case BLOCK_TYPE:
                    return <CodeBlockNode {...attributes}>{children}</CodeBlockNode>;
            }
        }
    };
}
