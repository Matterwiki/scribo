import React from "react";
import { FaFileCode } from "react-icons/fa";

import When from "slate-when";
import SoftBreak from "slate-soft-break";
import RenderNodePlugin from "../renderNode";

import { hasBlock, addOrRemoveBlock } from "../../changeUtils";

import ToolbarButton from "../../components/ToolbarButton";
import CodeBlockNode from "./CodeBlockNode";

import { NODE_TYPES } from "../../constants";

const BLOCK_TYPE = NODE_TYPES.CODE_BLOCK;

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
        RenderNodePlugin({ node: CodeBlockNode, nodeType: BLOCK_TYPE }),
        When({
            when: (value) => hasBlock(value, BLOCK_TYPE),
            plugin: SoftBreak()
        })
    ];
}
