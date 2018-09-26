import React from "react";

import { FaStrikethrough } from "react-icons/fa";

import RenderMarkPlugin from "../renderMark";
import MarkKeyBoardShortcutPlugin from "../markKeyboardShortcut";
import { hasMark, toggleMark } from "../../changeUtils";

import ToolbarButton from "../../components/ToolbarButton";
import StrikeThroughMark from "./StrikeThroughMark";

import { NODE_TYPES } from "../../constants";

const MARK_TYPE = NODE_TYPES.STRIKETHROUGH;
const KEYBOARD_COMBINATION = "mod+d";

export function StrikeThroughToolbarButton({ value, onChange, ...props }) {
    return (
        <ToolbarButton
            active={hasMark(value, MARK_TYPE)}
            icon={FaStrikethrough}
            onClick={(e) => onChange(toggleMark(value.change(), MARK_TYPE))}
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
