import React from "react";

import RenderNodePlugin from "../renderNode";
import { NODE_TYPES } from "../../constants";

export * from "./HeadingButton";

export function HeadingPlugins(options) {
    return [
        RenderNodePlugin({
            node: function HeadingOneNode({ children, attributes }) {
                return <h1 {...attributes}>{children}</h1>;
            },
            nodeType: NODE_TYPES.HEADING_ONE
        }),
        RenderNodePlugin({
            node: function HeadingTwoNode({ children, attributes }) {
                return <h2 {...attributes}>{children}</h2>;
            },
            nodeType: NODE_TYPES.HEADING_TWO
        }),
        RenderNodePlugin({
            node: function HeadingThreeNode({ children, attributes }) {
                return <h3 {...attributes}>{children}</h3>;
            },
            nodeType: NODE_TYPES.HEADING_THREE
        })
    ];
}
