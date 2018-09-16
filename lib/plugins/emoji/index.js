import React from "react";
import { Emoji } from "emoji-mart";

export const INLINE_TYPE = "emoji";

export const EmojiInlineNode = ({ nativeEmoji }) => (
    <Emoji emoji={nativeEmoji.id} set="emojione" size={20} />
);

export { default as EmojiToolbarButton } from "./EmojiToolbarButton";

export function EmojiPlugin(options) {
    return {
        renderNode(props) {
            const { type, data } = props.node;

            if (type !== INLINE_TYPE) return;

            const nativeEmoji = data.get("nativeEmoji");
            return <EmojiInlineNode nativeEmoji={nativeEmoji} {...props} />;
        },
        // TODO Implement OnPaste and OnCopy
        schema: {
            inlines: {
                emoji: {
                    isVoid: true
                }
            }
        }
    };
}
