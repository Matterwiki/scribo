import isKeyHotkey from "is-hotkey";

import { DEFAULT_NODE, NODE_TYPES } from "../constants";

export default function ClearAllFormattingPlugin(options) {
    return {
        onKeyDown(event, change) {
            const isBackSpaceKey = isKeyHotkey("backspace")(event);

            const { value } = change;

            if (!isBackSpaceKey) return;
            if (value.document.getBlocks().size > 1) return;
            if (value.document.text !== "") return;

            return change
                .setBlocks(DEFAULT_NODE)
                .unwrapBlock(NODE_TYPES.BULLETTED_LIST)
                .unwrapBlock(NODE_TYPES.NUMBERED_LIST)
                .focus();
        }
    };
}
