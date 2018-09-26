import React from "react";
import LinkInlineNode from "./LinkInlineNode";

import RenderNodePlugin from "../renderNode";

import { NODE_TYPES } from "../../constants";

const INLINE_TYPE = NODE_TYPES.LINK;

export { default as LinkToolbarButton } from "./LinkToolbarButton";

export function LinkPlugins(options) {
    return [
        RenderNodePlugin({
            node: LinkInlineNode,
            nodeType: INLINE_TYPE
        })
        // TODO OnPaste
    ];
}
