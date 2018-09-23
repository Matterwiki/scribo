import React from "react";

import HeadingOneIcon from "quill-icons/lib/icons/header";
import HeadingTwoIcon from "quill-icons/lib/icons/header-2";
import HeadingThreeIcon from "quill-icons/lib/icons/header-3";

import { hasBlock, addOrRemoveBlock } from "../utils";

import ToolbarButton from "../components/ToolbarButton";

export const BLOCK_TYPES = {
    HEADING_ONE: "heading-one",
    HEADING_TWO: "heading-two",
    HEADING_THREE: "heading-three"
};

export function HeadingOneNode({ children, attributes }) {
    return <h1 {...attributes}>{children}</h1>;
}
export function HeadingTwoNode({ children, attributes }) {
    return <h2 {...attributes}>{children}</h2>;
}
export function HeadingThreeNode({ children, attributes }) {
    return <h3 {...attributes}>{children}</h3>;
}

export function HeadingOneButton({ value, onChange, ...props }) {
    return (
        <ToolbarButton
            active={hasBlock(value, BLOCK_TYPES.HEADING_ONE)}
            icon={HeadingOneIcon}
            onClick={(e) => onChange(addOrRemoveBlock(value, BLOCK_TYPES.HEADING_ONE))}
            {...props}
        />
    );
}

export function HeadingTwoButton({ value, onChange, ...props }) {
    return (
        <ToolbarButton
            active={hasBlock(value, BLOCK_TYPES.HEADING_TWO)}
            icon={HeadingTwoIcon}
            onClick={(e) => onChange(addOrRemoveBlock(value, BLOCK_TYPES.HEADING_TWO))}
            {...props}
        />
    );
}

export function HeadingThreeButton({ value, onChange, ...props }) {
    return (
        <ToolbarButton
            active={hasBlock(value, BLOCK_TYPES.HEADING_THREE)}
            icon={HeadingThreeIcon}
            onClick={(e) => onChange(addOrRemoveBlock(value, BLOCK_TYPES.HEADING_THREE))}
            {...props}
        />
    );
}

export function HeadingPlugin(options) {
    return {
        renderNode({ node, attributes, children }) {
            switch (node.type) {
                case BLOCK_TYPES.HEADING_ONE:
                    return <HeadingOneNode {...attributes}>{children}</HeadingOneNode>;
                case BLOCK_TYPES.HEADING_TWO:
                    return <HeadingTwoNode {...attributes}>{children}</HeadingTwoNode>;
                case BLOCK_TYPES.HEADING_THREE:
                    return <HeadingThreeNode {...attributes}>{children}</HeadingThreeNode>;
            }
        }
    };
}
