import React from "react";

import { FaUnderline } from "react-icons/fa";

import RenderMarkPlugin from "./renderMark";
import MarkKeyBoardShortcutPlugin from "./markKeyboardShortcut";
import { hasMark, toggleMark } from "../changeUtils";

import ToolbarButton from "../components/ToolbarButton";

import { NODE_TYPES } from "../constants";

const MARK_TYPE = NODE_TYPES.UNDERLINED;
const KEYBOARD_COMBINATION = "mod+u";

export function UnderlinedMark({ children, attributes }) {
    return <u {...attributes}>{children}</u>;
}

export function UnderlinedToolbarButton({ value, onChange, ...props }) {
    return (
        <ToolbarButton
            icon={FaUnderline}
            active={hasMark(value, MARK_TYPE)}
            onClick={(e) => onChange(toggleMark(value.change(), MARK_TYPE))}
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
