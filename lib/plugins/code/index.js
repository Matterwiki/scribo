import React from "react";

import { FaCode } from "react-icons/fa";

import CodeMark from "./CodeMark";
import ToolbarButton from "../../components/ToolbarButton";

import MarkKeyBoardShortcutPlugin from "../markKeyboardShortcut";
import RenderMarkPlugin from "../renderMark";

import { NODE_TYPES } from "../../constants";

export const MARK_TYPE = NODE_TYPES.CODE;
export const KEYBOARD_COMBINATION = "mod+alt+c";

export function CodeToolbarButton({ value, editorRef: editor, ...props }) {
    return (
        <ToolbarButton
            icon={FaCode}
            active={editor.hasMark(MARK_TYPE)}
            onClick={(e) => editor.addOrRemoveMark(MARK_TYPE)}
            {...props}
        />
    );
}

// TODO Add schema normalization that adds extra text node after codeFence
// TODO Rename to codeFence
export function CodePlugins(options) {
    return [
        RenderMarkPlugin({ markNode: CodeMark, markType: MARK_TYPE }),
        MarkKeyBoardShortcutPlugin({ keyCombination: KEYBOARD_COMBINATION, markType: MARK_TYPE })
    ];
}
