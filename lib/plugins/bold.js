import React from "react";

import BoldIcon from "quill-icons/lib/icons/bold";
import { hasMark, toggleMark, generateMarkKeyDownEvent } from "../utils";

import ToolbarButton from "../components/ToolbarButton";

export const MARK_TYPE = "bold";
export const KEYBOARD_COMBINATION = "mod+b";

export function BoldMark({ children, attributes }) {
    return <strong {...attributes}>{children}</strong>;
}

export function BoldToolbarButton({ value, onChange, ...props }) {
    return (
        <ToolbarButton
            active={hasMark(value, MARK_TYPE)}
            icon={BoldIcon}
            onClick={(e) => onChange(toggleMark(value.change(), MARK_TYPE))}
            {...props}
        />
    );
}

export function BoldPlugin(options) {
    return {
        onKeyDown: generateMarkKeyDownEvent(MARK_TYPE, KEYBOARD_COMBINATION),
        renderMark(props) {
            const { mark } = props;

            if (mark.type !== MARK_TYPE) return;

            return <BoldMark {...props} />;
        }
    };
}
