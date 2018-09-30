import isKeyHotkey from "is-hotkey";

import { DEFAULT_NODE, NODE_TYPES } from "../../constants";
import { hasList, cleanupLists } from "../../changeUtils";

export default function ClearListFormattingPlugin(options) {
    return {
        onKeyDown(event, change) {
            const isEnterKey = isKeyHotkey("enter")(event);

            const { value } = change;

            if (!isEnterKey) return;
            if (
                !hasList(value, NODE_TYPES.NUMBERED_LIST) &&
                !hasList(value, NODE_TYPES.BULLETTED_LIST)
            )
                return;

            if (value.texts.map((t) => t.text).join("") !== "") return;

            return change
                .setBlocks(DEFAULT_NODE)
                .call(cleanupLists, true)
                .focus();
        }
    };
}
