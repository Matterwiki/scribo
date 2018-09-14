import React from "react";
import classnames from "classnames";

import ItaticIcon from "quill-icons/lib/icons/italic";
import { hasMark, toggleMark, onKeyDown } from "../utils";

import MarkComponents from "../components/Mark";
import ToolbarButton from "../components/ToolbarButton";
import ToolbarIcon from "../components/ToolbarIcon";

export const MARK_TYPE = "italic";
export const KEYBOARD_COMBINATION = "cmd+i";

export function ItalicToolbarButton({ value, onChange, className, ...props }) {
    className = classnames({ active: hasMark(value, MARK_TYPE) }, className);

    return (
        <ToolbarButton
            className={className}
            onClick={(e) => onChange(toggleMark(value.change(), MARK_TYPE))}
            {...props}>
            <ToolbarIcon icon={ItaticIcon} />
        </ToolbarButton>
    );
}

export function ItalicPlugin(options) {
    return {
        onKeyDown: onKeyDown(MARK_TYPE, KEYBOARD_COMBINATION),
        renderMark(props) {
            if (props.mark.type !== MARK_TYPE) return;

            return <MarkComponents.Italics {...props} />;
        }
    };
}
