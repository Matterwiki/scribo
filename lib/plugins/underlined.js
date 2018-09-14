import React from "react";
import classnames from "classnames";

import UnderlinedIcon from "quill-icons/lib/icons/underline";
import { hasMark, toggleMark, onKeyDown } from "../utils";

import MarkComponents from "../components/Mark";
import ToolbarButton from "../components/ToolbarButton";
import ToolbarIcon from "../components/ToolbarIcon";

export const MARK_TYPE = "underlined";
export const KEYBOARD_COMBINATION = "cmd+u";

export function UnderlinedToolbarButton({ value, onChange, className, ...props }) {
    className = classnames({ active: hasMark(value, MARK_TYPE) }, className);

    return (
        <ToolbarButton
            className={className}
            onClick={(e) => onChange(toggleMark(value.change(), MARK_TYPE))}
            {...props}>
            <ToolbarIcon icon={UnderlinedIcon} />
        </ToolbarButton>
    );
}

export function UnderlinedPlugin(options) {
    return {
        onKeyDown: onKeyDown(MARK_TYPE, KEYBOARD_COMBINATION),
        renderMark(props) {
            if (props.mark.type !== MARK_TYPE) return;

            return <MarkComponents.Underlined {...props} />;
        }
    };
}
