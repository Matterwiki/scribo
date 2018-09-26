import React from "react";

import { FaCode } from "react-icons/fa";

import CodeMark from "./CodeMark";
import ToolbarButton from "../../components/ToolbarButton";

import { hasMark, toggleMark } from "../../changeUtils";
import MarkKeyBoardShortcutPlugin from "../markKeyboardShortcut";
import RenderMarkPlugin from "../renderMark";

import { NODE_TYPES } from "../../constants";

export const MARK_TYPE = NODE_TYPES.CODE;
export const KEYBOARD_COMBINATION = "mod+alt+c";

export function CodeToolbarButton({ value, onChange, ...props }) {
    return (
        <ToolbarButton
            icon={FaCode}
            active={hasMark(value, MARK_TYPE)}
            onClick={(e) => onChange(toggleMark(value.change(), MARK_TYPE))}
            {...props}
        />
    );
}

export function CodePlugins(options) {
    return [
        RenderMarkPlugin({ markNode: CodeMark, markType: MARK_TYPE }),
        MarkKeyBoardShortcutPlugin({ keyCombination: KEYBOARD_COMBINATION, markType: MARK_TYPE })
    ];
}
