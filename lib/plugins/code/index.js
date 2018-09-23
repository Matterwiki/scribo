import React from "react";

import { FaCode } from "react-icons/fa";
import { hasMark, toggleMark, generateMarkKeyDownEvent } from "../../utils";

import CodeMark from "./CodeMark";
import ToolbarButton from "../../components/ToolbarButton";

export const MARK_TYPE = "code";
export const KEYBOARD_COMBINATION = "mod+alt+c`";

export function CodeToolbarButton({ value, onChange, ...props }) {
    return (
        <ToolbarButton
            icon={FaCode}
            active={hasMark(value, MARK_TYPE)}
            onClick={(e) => onChange(toggleMark(value.change(), MARK_TYPE))}
            {...props}
        />
    );
}

export function CodePlugin(options) {
    return {
        onKeyDown: generateMarkKeyDownEvent(MARK_TYPE, KEYBOARD_COMBINATION),
        renderMark(props) {
            if (props.mark.type !== MARK_TYPE) return;

            return <CodeMark {...props} />;
        }
    };
}
