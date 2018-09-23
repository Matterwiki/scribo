import React from "react";

import ItaticIcon from "quill-icons/lib/icons/italic";
import { hasMark, toggleMark, generateMarkKeyDownEvent } from "../utils";

import ToolbarButton from "../components/ToolbarButton";

export const MARK_TYPE = "italic";
export const KEYBOARD_COMBINATION = "mod+i";

export function ItalicsMark({ children, attributes }) {
    return <em {...attributes}>{children}</em>;
}

export function ItalicToolbarButton({ value, onChange, ...props }) {
    return (
        <ToolbarButton
            active={hasMark(value, MARK_TYPE)}
            icon={ItaticIcon}
            onClick={(e) => onChange(toggleMark(value.change(), MARK_TYPE))}
            {...props}
        />
    );
}

export function ItalicPlugin(options) {
    return {
        onKeyDown: generateMarkKeyDownEvent(MARK_TYPE, KEYBOARD_COMBINATION),
        renderMark(props) {
            if (props.mark.type !== MARK_TYPE) return;

            return <ItalicsMark {...props} />;
        }
    };
}
