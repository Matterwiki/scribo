import React from "react";
import { FaBold } from "react-icons/fa";

import RenderMarkPlugin from "./renderMark";
import MarkKeyBoardShortcutPlugin from "./markKeyboardShortcut";

import ToolbarButton from "../components/ToolbarButton";

import { NODE_TYPES } from "../constants";

const MARK_TYPE = NODE_TYPES.BOLD;
const KEYBOARD_COMBINATION = "mod+b";

export function BoldMark({ children, attributes }) {
    return <strong {...attributes}>{children}</strong>;
}

export function BoldToolbarButton({ value, editorRef: editor, ...props }) {
    return (
        <ToolbarButton
            active={editor.hasMark(value, MARK_TYPE)}
            icon={FaBold}
            onClick={(e) => editor.addOrRemoveMark(MARK_TYPE)}
            {...props}
        />
    );
}

export function BoldPlugins(options) {
    return [
        RenderMarkPlugin({ markNode: BoldMark, markType: MARK_TYPE }),
        MarkKeyBoardShortcutPlugin({ keyCombination: KEYBOARD_COMBINATION, markType: MARK_TYPE })
    ];
}
