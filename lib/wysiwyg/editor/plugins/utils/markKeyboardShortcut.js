import isKeyHotkey from "is-hotkey";

/**
 * Sets up a keyboard shortcut to enable a mark to be applied on a node
 *
 * @param {object} options
 * @param {string} [options.keyCombination=null]
 * @param {string} [options.type=null]
 */
export default function MarkKeyBoardShortCutPlugin(options = {}) {
    const keyCombination = options.keyCombination || null;
    const type = options.type || null;

    return {
        onKeyDown(event, editor, next) {
            if (!isKeyHotkey(keyCombination)(event)) return next();

            event.preventDefault();
            editor.addOrRemoveMark(type);
            return true;
        }
    };
}
