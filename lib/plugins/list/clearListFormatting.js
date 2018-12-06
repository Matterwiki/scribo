import isKeyHotkey from "is-hotkey";

import { DEFAULT_NODE, NODE_TYPES } from "../../constants";

export default function ClearListFormattingPlugin(options) {
    return {
        onKeyDown(event, editor, next) {
            const isEnterKey = isKeyHotkey("enter")(event);

            const { value } = editor;

            if (!isEnterKey) return next();

            if (
                !editor.hasList(value, NODE_TYPES.NUMBERED_LIST) &&
                !editor.hasList(value, NODE_TYPES.BULLETTED_LIST)
            )
                return next();

            if (value.texts.map((t) => t.text).join("") !== "") return next();

            editor
                .setBlocks(DEFAULT_NODE)
                .clearLists(value)
                .focus();

            return true;
        }
    };
}
