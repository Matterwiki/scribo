import React from "react";
import classnames from "classnames";

import StrikeThroughIcon from "quill-icons/lib/icons/strike";
import { hasMark, toggleMark, onKeyDown } from "../utils";

import MarkComponents from "../components/Mark";
import ToolbarButton from "../components/ToolbarButton";
import ToolbarIcon from "../components/ToolbarIcon";

export const MARK_TYPE = "strikethrough";
export const KEYBOARD_COMBINATION = "cmd+d";

export function StrikeThroughToolbarButton({ value, onChange, className, ...props }) {
    className = classnames({ active: hasMark(value, MARK_TYPE) }, className);

    return (
        <ToolbarButton
            className={className}
            onClick={(e) => onChange(toggleMark(value.change(), MARK_TYPE))}
            {...props}>
            <ToolbarIcon icon={StrikeThroughIcon} />
        </ToolbarButton>
    );
}

export function StrikeThroughPlugin(options) {
    return {
        onKeyDown: onKeyDown(MARK_TYPE, KEYBOARD_COMBINATION),
        renderMark(props) {
            if (props.mark.type !== MARK_TYPE) return;

            return <MarkComponents.StrikeThrough {...props} />;
        }
    };
}
