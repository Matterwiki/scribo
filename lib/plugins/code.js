import React from "react";
import classnames from "classnames";

import CodeIcon from "quill-icons/lib/icons/code";
import { hasMark, toggleMark, generateMarkKeyDownEvent } from "../utils";

import MarkComponents from "../components/Mark";
import ToolbarButton from "../components/ToolbarButton";
import ToolbarIcon from "../components/ToolbarIcon";

export const MARK_TYPE = "code";
export const KEYBOARD_COMBINATION = "mod+alt+c`";

export function CodeToolbarButton({ value, onChange, className, ...props }) {
    className = classnames({ active: hasMark(value, MARK_TYPE) }, className);

    return (
        <ToolbarButton
            className={className}
            onClick={(e) => onChange(toggleMark(value.change(), MARK_TYPE))}
            {...props}>
            <ToolbarIcon icon={CodeIcon} />
        </ToolbarButton>
    );
}

export function CodePlugin(options) {
    return {
        onKeyDown: generateMarkKeyDownEvent(MARK_TYPE, KEYBOARD_COMBINATION),
        renderMark(props) {
            if (props.mark.type !== MARK_TYPE) return;

            return <MarkComponents.Code {...props} />;
        }
    };
}
