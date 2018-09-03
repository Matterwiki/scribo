import React from "react";
import classnames from "classnames";

import BoldIcon from "quill-icons/lib/icons/bold";
import { hasMark, toggleMark, onKeyDown } from "../utils";

import { ToolbarButton, ToolbarIcon, MarkComponents } from "../components/index";

export const MARK_TYPE = "bold";
export const KEYBOARD_COMBINATION = "cmd+b";

export function BoldToolbarButton({ value, onChange, className, ...props }) {
    className = classnames({ active: hasMark(value, MARK_TYPE) }, className);

    return (
        <ToolbarButton
            className={className}
            onClick={(e) => onChange(toggleMark(value.change(), MARK_TYPE))}
            {...props}>
            <ToolbarIcon icon={BoldIcon} />
        </ToolbarButton>
    );
}

export function BoldPlugin(options) {
    return {
        onKeyDown: onKeyDown(MARK_TYPE, KEYBOARD_COMBINATION),
        renderMark(props) {
            if (props.mark.type !== MARK_TYPE) return;

            return <MarkComponents.Bold {...props} />;
        }
    };
}
