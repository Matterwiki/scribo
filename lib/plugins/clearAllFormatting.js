import isHotKey from "is-hotkey";

import { DEFAULT_NODE, NODE_TYPES } from "../constants";

import { cleanupLists, cleanupMarks } from "../changeUtils";

/**
 * Clears all formatting based on keypress and exit conditions
 *
 * @param {object} options
 * @param {string} [options.keyName=null]
 * @param {Function} [options.exitCondition=null]
 * @param {boolean} [options.clearMark=false]
 */
export default function ClearAllFormattingPlugin(options) {
    const keyName = options.keyName || null;
    const exitCondition = options.exitCondition || ((value) => false);
    const clearMark = typeof options.clearMark === "boolean" ? options.clearMark : false;

    if (!keyName) return;

    const isKeyHotkey = isHotKey(keyName);

    return {
        // TODO Make sure that this accurate and is what is needed!
        onKeyUp(event, change) {
            const wasKeyPressed = isKeyHotkey(event);

            const { value } = change;

            if (!wasKeyPressed) return;

            // If this passes exit condition, do nothing
            if (exitCondition(value)) return;

            change.setBlocks(DEFAULT_NODE).call(cleanupLists, true);

            if (clearMark) change.call(cleanupMarks);

            change.focus();

            return change;
        }
    };
}
