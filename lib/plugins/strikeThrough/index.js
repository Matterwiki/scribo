import React from "react";

import { FaStrikethrough } from "react-icons/fa";

import RenderMarkPlugin from "../renderMark";
import MarkKeyBoardShortcutPlugin from "../markKeyboardShortcut";

import ToolbarButton from "../../components/ToolbarButton";
import StrikeThroughMark from "./StrikeThroughMark";

import { NODE_TYPES } from "../../constants";

const MARK_TYPE = NODE_TYPES.STRIKETHROUGH;
const KEYBOARD_COMBINATION = "mod+d";

export function StrikeThroughToolbarButton({ value, onChange, editorRef: editor, ...props }) {
    return (
        <ToolbarButton
            active={editor.hasMark(value, MARK_TYPE)}
            icon={FaStrikethrough}
            onClick={(e) => onChange(editor.addOrRemoveMark(MARK_TYPE))}
            {...props}
        />
    );
}

export function StrikeThroughPlugins(options) {
    return [
        RenderMarkPlugin({ markNode: StrikeThroughMark, markType: MARK_TYPE }),
        MarkKeyBoardShortcutPlugin({ keyCombination: KEYBOARD_COMBINATION, markType: MARK_TYPE })
    ];
}
