import isKeyHotkey from "is-hotkey";

import { toggleMark } from "../changeUtils";

/**
 * Sets up a keyboard shortcut to enable a mark to be applied on a node
 *
 * @param {object} options
 * @param {string} [options.keyCombination=null]
 * @param {string} [options.markType=null]
 */
export default function MarkKeyBoardShortCutPlugin(options = {}) {
    const keyCombination = options.keyCombination || null;
    const type = options.markType || null;

    return {
        onKeyDown(event, change) {
            // setup keyboard hotkey checker
            const matchesHotKey = isKeyHotkey(keyCombination);

            // if this is not it, move out!
            if (!matchesHotKey(event)) return;

            event.preventDefault();
            toggleMark(change, type);
            return true;
        }
    };
}
