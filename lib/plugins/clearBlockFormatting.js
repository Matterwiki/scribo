import isKeyHotkey from "is-hotkey";

import { DEFAULT_NODE } from "../constants";

export default function ClearBlockFormattingPlugin(options) {
    return {
        onKeyDown(event, change) {
            const matchesHotKey = isKeyHotkey("backspace");

            if (
                matchesHotKey(event) &&
                change.value.document.getBlocks().size === 1 &&
                change.value.document.text === ""
            ) {
                change.setBlocks(DEFAULT_NODE).focus();
            }
        }
    };
}
