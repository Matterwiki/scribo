import React from "react";
import classnames from "classnames";

import BoldIcon from "quill-icons/lib/icons/bold";
import { hasMark, toggleMark, generateMarkKeyDownEvent } from "../utils";

import MarkComponents from "../components/Mark";
import ToolbarButton from "../components/ToolbarButton";
import ToolbarIcon from "../components/ToolbarIcon";

export const MARK_TYPE = "bold";
export const KEYBOARD_COMBINATION = "mod+b";

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
        onKeyDown: generateMarkKeyDownEvent(MARK_TYPE, KEYBOARD_COMBINATION),
        renderMark(props) {
            const { mark } = props;

            if (mark.type !== MARK_TYPE) return;

            return <MarkComponents.Bold {...props} />;
        }
    };
}
