import React from "react";

import { FaItalic } from "react-icons/fa";

import RenderMarkPlugin from "./renderMark";
import MarkKeyBoardShortcutPlugin from "./markKeyboardShortcut";
import { hasMark, toggleMark } from "../changeUtils";

import ToolbarButton from "../components/ToolbarButton";

import { NODE_TYPES } from "../constants";

const MARK_TYPE = NODE_TYPES.ITALIC;
const KEYBOARD_COMBINATION = "mod+i";

export function ItalicsMark({ children, attributes }) {
    return <em {...attributes}>{children}</em>;
}

export function ItalicToolbarButton({ value, onChange, ...props }) {
    return (
        <ToolbarButton
            active={hasMark(value, MARK_TYPE)}
            icon={FaItalic}
            onClick={(e) => onChange(toggleMark(value.change(), MARK_TYPE))}
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
