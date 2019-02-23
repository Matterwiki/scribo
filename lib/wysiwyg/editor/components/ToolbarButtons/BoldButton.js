import React from "react";
import { FaBold } from "react-icons/fa";

import ToolbarButton from "../../../../common/components/ToolbarButton";
import { NODE_TYPES } from "../../../../common/constants";

const MARK_TYPE = NODE_TYPES.BOLD;

export default function BoldToolbarButton({ value, editor, ...props }) {
    return (
        <ToolbarButton
            active={editor.hasMark(MARK_TYPE)}
            icon={FaBold}
            onClick={(e) => editor.addOrRemoveMark(MARK_TYPE)}
            {...props}
        />
    );
}
