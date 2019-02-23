import React from "react";

import { FaUnderline } from "react-icons/fa";

import ToolbarButton from "../../../../common/components/ToolbarButton";
import { NODE_TYPES } from "../../../../common/constants";

const MARK_TYPE = NODE_TYPES.UNDERLINED;

export default function UnderlinedToolbarButton({ value, editor, ...props }) {
    return (
        <ToolbarButton
            icon={FaUnderline}
            active={editor.hasMark(MARK_TYPE)}
            onClick={(e) => editor.addOrRemoveMark(MARK_TYPE)}
            {...props}
        />
    );
}
