import React from "react";
import { FaFileCode } from "react-icons/fa";

import SoftBreak from "../softBreak";
import RenderNodePlugin from "../renderNode";

import ToolbarButton from "../../components/ToolbarButton";
import CodeBlockNode from "./CodeBlockNode";

import { NODE_TYPES } from "../../constants";

const BLOCK_TYPE = NODE_TYPES.CODE_BLOCK;

export function CodeBlockButton({ value, editorRef: editor, ...props }) {
    return (
        <ToolbarButton
            active={editor.hasBlock(BLOCK_TYPE)}
            icon={FaFileCode}
            onClick={(e) => editor.addOrRemoveBlock(BLOCK_TYPE)}
            {...props}
        />
    );
}

export function CodeBlockPlugins(options) {
    return [
        RenderNodePlugin({ node: CodeBlockNode, nodeType: BLOCK_TYPE }),
        SoftBreak({ blockType: BLOCK_TYPE })
    ];
}
