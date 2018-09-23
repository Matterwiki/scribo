import React from "react";
import When from "slate-when";
import SoftBreak from "slate-soft-break";

import { FaFileCode } from "react-icons/fa";

import { hasBlock, addOrRemoveBlock } from "../../utils";

import ToolbarButton from "../../components/ToolbarButton";
import CodeBlockNode from "./CodeBlockNode";

export const BLOCK_TYPE = "code-block";

export function CodeBlockButton({ value, onChange, ...props }) {
    return (
        <ToolbarButton
            active={hasBlock(value, BLOCK_TYPE)}
            icon={FaFileCode}
            onClick={(e) => onChange(addOrRemoveBlock(value, BLOCK_TYPE))}
            {...props}
        />
    );
}

export function CodeBlockPlugins(options) {
    return [
        {
            renderNode({ node, attributes, children }) {
                switch (node.type) {
                    case BLOCK_TYPE:
                        return <CodeBlockNode {...attributes}>{children}</CodeBlockNode>;
                }
            }
        },
        When({
            when: (value) => hasBlock(value, BLOCK_TYPE),
            plugin: SoftBreak()
        })
    ];
}
