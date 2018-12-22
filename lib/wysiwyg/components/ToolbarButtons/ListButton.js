import React from "react";

import { FaListOl, FaListUl } from "react-icons/fa";

import ToolbarButton from "../../../common/components/ToolbarButton";
import { NODE_TYPES } from "../../../common/constants";

export function NumberedListButton({ value, editorRef: editor, ...props }) {
    return (
        <ToolbarButton
            active={editor.hasList(NODE_TYPES.NUMBERED_LIST)}
            icon={FaListOl}
            onClick={(e) => editor.addOrRemoveList(NODE_TYPES.NUMBERED_LIST)}
            {...props}
        />
    );
}

export function BulletedListButton({ value, editorRef: editor, ...props }) {
    return (
        <ToolbarButton
            active={editor.hasList(NODE_TYPES.BULLETED_LIST)}
            icon={FaListUl}
            onClick={(e) => editor.addOrRemoveList(NODE_TYPES.BULLETED_LIST)}
            {...props}
        />
    );
}
