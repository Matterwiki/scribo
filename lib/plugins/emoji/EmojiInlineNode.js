import React from "react";
import { Emoji } from "emoji-mart";

export default function EmojiInlineNode(props) {
    const { data } = props.node;

    const nativeEmoji = data.get("nativeEmoji");

    return <Emoji emoji={nativeEmoji.id} set="emojione" size={20} />;
}
