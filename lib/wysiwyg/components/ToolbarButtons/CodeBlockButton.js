import React from "react";
import { FaFileCode } from "react-icons/fa";

import ToolbarButton from "../../../common/components/ToolbarButton";

import { NODE_TYPES } from "../../../common/constants";

const BLOCK_TYPE = NODE_TYPES.CODE_BLOCK;

export default function CodeBlockButton({ value, editorRef: editor, ...props }) {
    return (
        <ToolbarButton
            active={editor.hasBlock(BLOCK_TYPE)}
            icon={FaFileCode}
            onClick={(e) => editor.addOrRemoveBlock(BLOCK_TYPE)}
            {...props}
        />
    );
}
