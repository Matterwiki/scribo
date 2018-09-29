import React from "react";

import RenderNodePlugin from "../renderNode";
import { NODE_TYPES } from "../../constants";

export * from "./ListButton";

export function ListPlugins(options) {
    return [
        RenderNodePlugin({
            node: function BullettedListNode({ children, attributes }) {
                return <ul {...attributes}>{children}</ul>;
            },
            nodeType: NODE_TYPES.BULLETTED_LIST
        }),
        RenderNodePlugin({
            node: function NumberedListNode({ children, attributes }) {
                return <ol {...attributes}>{children}</ol>;
            },
            nodeType: NODE_TYPES.NUMBERED_LIST
        }),
        RenderNodePlugin({
            node: function ListItem({ children, attributes }) {
                return <li {...attributes}>{children}</li>;
            },
            nodeType: NODE_TYPES.LIST_ITEM
        })
        // TODO Checklist
        // RenderNodePlugin({
        //     node: null
        //     nodeType: NODE_TYPES.HEADING_THREE
        // })
    ];
}
