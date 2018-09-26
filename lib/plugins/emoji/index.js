import React from "react";
import RenderNodePlugin from "../renderNode";
import EmojiInlineNode from "./EmojiInlineNode";
import { NODE_TYPES } from "../../constants";

const INLINE_TYPE = NODE_TYPES.EMOJI;

export { default as EmojiToolbarButton } from "./EmojiToolbarButton";

export function EmojiPlugins(options) {
    return [
        // TODO Implement OnPaste and OnCopy
        // TODO Fix bug: When emoji is inserted in an empty document, and then deleted, emoji still stays on screen
        {
            schema: {
                inlines: {
                    emoji: {
                        isVoid: true
                    }
                }
            }
        },
        RenderNodePlugin({ node: EmojiInlineNode, nodeType: INLINE_TYPE })
    ];
}
