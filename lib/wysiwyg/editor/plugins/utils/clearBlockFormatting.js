import isHotKey from "is-hotkey";

import { DEFAULT_NODE } from "../../../../common/constants";

/**
 * Clears all formatting based on keypress
 *
 * TODO Could be moved to schema normalization!
 *
 * @param {object} options
 */
export default function ClearBlockFormattingPlugin(options) {
    return {
        // TODO Make sure that this accurate and is what is needed!
        onKeyUp(event, editor, next) {
            editor
                .clearLists()
                .setBlocks(DEFAULT_NODE)
                .focus();

            return true;
        }
    };
}
