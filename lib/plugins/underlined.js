import React from "react";

import { FaUnderline } from "react-icons/fa";

import RenderMarkPlugin from "./renderMark";
import MarkKeyBoardShortcutPlugin from "./markKeyboardShortcut";

import ToolbarButton from "../components/ToolbarButton";

import { NODE_TYPES } from "../constants";

const MARK_TYPE = NODE_TYPES.UNDERLINED;
const KEYBOARD_COMBINATION = "mod+u";

export function UnderlinedMark({ children, attributes }) {
    return <u {...attributes}>{children}</u>;
}

export function UnderlinedToolbarButton({ value, editorRef: editor, ...props }) {
    return (
        <ToolbarButton
            icon={FaUnderline}
            active={editor.hasMark(value, MARK_TYPE)}
            onClick={(e) => editor.addOrRemoveMark(MARK_TYPE)}
            {...props}
        />
    );
}

export function UnderlinedPlugins(options) {
    return [
        RenderMarkPlugin({ markNode: UnderlinedMark, markType: MARK_TYPE }),
        MarkKeyBoardShortcutPlugin({ keyCombination: KEYBOARD_COMBINATION, markType: MARK_TYPE })
    ];
}
