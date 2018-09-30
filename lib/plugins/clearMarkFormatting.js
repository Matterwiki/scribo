import isHotKey from "is-hotkey";

import { cleanupMarks } from "../changeUtils";

/**
 * Clears mark formatting based on keypress and exit conditions
 *
 * @param {object} options
 * @param {string} [options.keyName=null]
 * @param {Function} [options.exitCondition]
 */
export default function ClearMarkFormattingPlugin(options) {
    const keyName = options.keyName || null;
    const exitCondition = options.exitCondition || ((value) => false);

    const isKeyHotkey = isHotKey(keyName);

    return {
        // TODO Make sure that this accurate and is what is needed!
        onKeyUp(event, change) {
            const wasKeyPressed = isKeyHotkey(event);

            const { value } = change;

            if (!wasKeyPressed) return;

            // If this passes exit condition, do nothing
            if (exitCondition(value)) return;

            return change.call(cleanupMarks).focus();
        }
    };
}
