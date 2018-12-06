import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

import SoftBreak from "../softBreak";
import RenderNodePlugin from "../renderNode";

import ToolbarButton from "../../components/ToolbarButton";
import BlockQuoteNode from "./BlockQuoteNode";

import { NODE_TYPES } from "../../constants";

const BLOCK_TYPE = NODE_TYPES.BLOCK_QUOTE;

export function BlockQuoteButton({ value, onChange, editorRef: editor, ...props }) {
    return (
        <ToolbarButton
            active={editor.hasBlock(value, BLOCK_TYPE)}
            icon={FaQuoteLeft}
            onClick={(e) => editor.addOrRemoveBlock(value, BLOCK_TYPE)}
            {...props}
        />
    );
}

export function BlockQuotePlugins(options) {
    return [
        RenderNodePlugin({ node: BlockQuoteNode, nodeType: BLOCK_TYPE }),
        SoftBreak({ blockType: BLOCK_TYPE })
    ];
}
