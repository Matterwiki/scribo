import React from "react";

import { FaStrikethrough } from "react-icons/fa";

import ToolbarButton from "../../../common/components/ToolbarButton";
import { NODE_TYPES } from "../../../common/constants";

const MARK_TYPE = NODE_TYPES.STRIKETHROUGH;
const KEYBOARD_COMBINATION = "mod+d";

export default function StrikeThroughToolbarButton({
    value,
    onChange,
    editorRef: editor,
    ...props
}) {
    return (
        <ToolbarButton
            active={editor.hasMark(MARK_TYPE)}
            icon={FaStrikethrough}
            onClick={(e) => onChange(editor.addOrRemoveMark(MARK_TYPE))}
            {...props}
        />
    );
}
