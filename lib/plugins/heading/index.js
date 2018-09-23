import React from "react";

import { BLOCK_TYPES } from "./constants";

export * from "./HeadingButton";

export function HeadingOneNode({ children, attributes }) {
    return <h1 {...attributes}>{children}</h1>;
}
export function HeadingTwoNode({ children, attributes }) {
    return <h2 {...attributes}>{children}</h2>;
}
export function HeadingThreeNode({ children, attributes }) {
    return <h3 {...attributes}>{children}</h3>;
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
