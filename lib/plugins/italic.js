import React from "react";

import { FaItalic } from "react-icons/fa";

import RenderMarkPlugin from "./renderMark";
import MarkKeyBoardShortcutPlugin from "./markKeyboardShortcut";

import ToolbarButton from "../components/ToolbarButton";

import { NODE_TYPES } from "../constants";

const MARK_TYPE = NODE_TYPES.ITALIC;
const KEYBOARD_COMBINATION = "mod+i";

export function ItalicsMark({ children, attributes }) {
    return <em {...attributes}>{children}</em>;
}

export function ItalicToolbarButton({ value, editorRef: editor, ...props }) {
    return (
        <ToolbarButton
            active={editor.hasMark(MARK_TYPE)}
            icon={FaItalic}
            onClick={(e) => editor.addOrRemoveMark(MARK_TYPE)}
            {...props}
        />
    );
}

export function ItalicPlugins(options) {
    return [
        RenderMarkPlugin({ markNode: ItalicsMark, markType: MARK_TYPE }),
        MarkKeyBoardShortcutPlugin({ keyCombination: KEYBOARD_COMBINATION, markType: MARK_TYPE })
    ];
}
