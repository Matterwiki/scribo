import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

import When from "slate-when";

import SoftBreak from "slate-soft-break";
import RenderNodePlugin from "../renderNode";

import ToolbarButton from "../../components/ToolbarButton";
import BlockQuoteNode from "./BlockQuoteNode";

import { hasBlock, addOrRemoveBlock } from "../../changeUtils";

import { NODE_TYPES } from "../../constants";

const BLOCK_TYPE = NODE_TYPES.BLOCK_QUOTE;

export function BlockQuoteButton({ value, onChange, ...props }) {
    return (
        <ToolbarButton
            active={hasBlock(value, BLOCK_TYPE)}
            icon={FaQuoteLeft}
            onClick={(e) => onChange(addOrRemoveBlock(value, BLOCK_TYPE))}
            {...props}
        />
    );
}

export function BlockQuotePlugins(options) {
    return [
        RenderNodePlugin({ node: BlockQuoteNode, nodeType: BLOCK_TYPE }),
        When({
            when: (value) => hasBlock(value, BLOCK_TYPE),
            plugin: SoftBreak()
        })
    ];
}
