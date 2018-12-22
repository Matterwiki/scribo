import isHotKey from "is-hotkey";

import { DEFAULT_NODE } from "../../../common/constants";

/**
 * Clears all formatting based on keypress and exit conditions
 *
 * TODO Could be moved to schema normalization!
 *
 * @param {object} options
 * @param {string} [options.keyName=null]
 * @param {Function} [options.exitCondition]
 */
export default function ClearBlockFormattingPlugin(options) {
    const keyName = options.keyName || null;
    const exitCondition = options.exitCondition || (() => false);

    const isKeyHotkey = isHotKey(keyName);

    return {
        // TODO Make sure that this accurate and is what is needed!
        onKeyUp(event, editor, next) {
            const wasKeyPressed = isKeyHotkey(event);

            const { value } = editor;

            if (!wasKeyPressed) return next();

            // If this passes exit condition, do nothing
            if (exitCondition(value)) return next();

            editor
                .setBlocks(DEFAULT_NODE)
                .clearLists()
                .focus();

            return true;
        }
    };
}
