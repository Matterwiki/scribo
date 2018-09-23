import React from "react";

import StrikeThroughIcon from "quill-icons/lib/icons/strike";
import { hasMark, toggleMark, generateMarkKeyDownEvent } from "../../utils";

import ToolbarButton from "../../components/ToolbarButton";
import StrikeThroughMark from "./StrikeThroughMark";

export const MARK_TYPE = "strikethrough";
export const KEYBOARD_COMBINATION = "mod+d";

export function StrikeThroughToolbarButton({ value, onChange, ...props }) {
    return (
        <ToolbarButton
            active={hasMark(value, MARK_TYPE)}
            icon={StrikeThroughIcon}
            onClick={(e) => onChange(toggleMark(value.change(), MARK_TYPE))}
            {...props}
        />
    );
}

export function StrikeThroughPlugin(options) {
    return {
        onKeyDown: generateMarkKeyDownEvent(MARK_TYPE, KEYBOARD_COMBINATION),
        renderMark(props) {
            if (props.mark.type !== MARK_TYPE) return;

            return <StrikeThroughMark {...props} />;
        }
    };
}
