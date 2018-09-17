import React from "react";
import cx from "classnames";

import HeadingOneIcon from "quill-icons/lib/icons/header";
import HeadingTwoIcon from "quill-icons/lib/icons/header-2";
import HeadingThreeIcon from "quill-icons/lib/icons/header-3";

import { hasBlock, addOrRemoveBlock } from "../utils";

import { HeadingOne, HeadingTwo, HeadingThree } from "../components/Node";

import ToolbarButton from "../components/ToolbarButton";
import ToolbarIcon from "../components/ToolbarIcon";

export const BLOCK_TYPES = {
    HEADING_ONE: "heading-one",
    HEADING_TWO: "heading-two",
    HEADING_THREE: "heading-three"
};

export function HeadingOneButton({ value, onChange, className, ...props }) {
    className = cx({ active: hasBlock(value, BLOCK_TYPES.HEADING_ONE) }, className);

    return (
        <ToolbarButton
            className={className}
            onClick={(e) => onChange(addOrRemoveBlock(value, BLOCK_TYPES.HEADING_ONE))}
            {...props}>
            <ToolbarIcon icon={HeadingOneIcon} />
        </ToolbarButton>
    );
}

export function HeadingTwoButton({ value, onChange, className, ...props }) {
    className = cx({ active: hasBlock(value, BLOCK_TYPES.HEADING_TWO) }, className);

    return (
        <ToolbarButton
            className={className}
            onClick={(e) => onChange(addOrRemoveBlock(value, BLOCK_TYPES.HEADING_TWO))}
            {...props}>
            <ToolbarIcon icon={HeadingTwoIcon} />
        </ToolbarButton>
    );
}

export function HeadingThreeButton({ value, onChange, className, ...props }) {
    className = cx({ active: hasBlock(value, BLOCK_TYPES.HEADING_THREE) }, className);

    return (
        <ToolbarButton
            className={className}
            onClick={(e) => onChange(addOrRemoveBlock(value, BLOCK_TYPES.HEADING_THREE))}
            {...props}>
            <ToolbarIcon icon={HeadingThreeIcon} />
        </ToolbarButton>
    );
}

export function HeadingPlugin(options) {
    return {
        renderNode({ node, attributes, children }) {
            switch (node.type) {
                case BLOCK_TYPES.HEADING_ONE:
                    return <HeadingOne {...attributes}>{children}</HeadingOne>;
                case BLOCK_TYPES.HEADING_TWO:
                    return <HeadingTwo {...attributes}>{children}</HeadingTwo>;
                case BLOCK_TYPES.HEADING_THREE:
                    return <HeadingThree {...attributes}>{children}</HeadingThree>;
            }
        }
    };
}
