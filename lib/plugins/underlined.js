import React from "react";

import UnderlinedIcon from "quill-icons/lib/icons/underline";
import { hasMark, toggleMark, generateMarkKeyDownEvent } from "../utils";

import ToolbarButton from "../components/ToolbarButton";

export const MARK_TYPE = "underlined";
export const KEYBOARD_COMBINATION = "mod+u";

export function UnderlinedMark({ children, attributes }) {
    return <u {...attributes}>{children}</u>;
}

export function UnderlinedToolbarButton({ value, onChange, ...props }) {
    return (
        <ToolbarButton
            icon={UnderlinedIcon}
            active={hasMark(value, MARK_TYPE)}
            onClick={(e) => onChange(toggleMark(value.change(), MARK_TYPE))}
            {...props}
        />
    );
}

export function UnderlinedPlugin(options) {
    return {
        onKeyDown: generateMarkKeyDownEvent(MARK_TYPE, KEYBOARD_COMBINATION),
        renderMark(props) {
            if (props.mark.type !== MARK_TYPE) return;

            return <UnderlinedMark {...props} />;
        }
    };
}
