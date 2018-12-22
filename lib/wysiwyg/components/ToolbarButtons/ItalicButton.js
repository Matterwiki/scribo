import React from "react";

import { FaItalic } from "react-icons/fa";

import ToolbarButton from "../../../common/components/ToolbarButton";

import { NODE_TYPES } from "../../../common/constants";

const MARK_TYPE = NODE_TYPES.ITALIC;

export default function ItalicToolbarButton({ value, editorRef: editor, ...props }) {
    return (
        <ToolbarButton
            active={editor.hasMark(MARK_TYPE)}
            icon={FaItalic}
            onClick={(e) => editor.addOrRemoveMark(MARK_TYPE)}
            {...props}
        />
    );
}
