import isHotKey from "is-hotkey";

/**
 * Clears mark formatting based on keypress and exit conditions
 *
 * @param {object} options
 * @param {string} [options.keyName=null]
 */
export default function ClearMarkFormattingPlugin(options) {
    const keyName = options.keyName || null;

    const isKeyHotkey = isHotKey(keyName);

    return {
        // TODO Make sure that this accurate and is what is needed!
        onKeyUp(event, editor, next) {
            const wasKeyPressed = isKeyHotkey(event);

            const { value } = editor;

            if (!wasKeyPressed) return next();

            editor.clearMarks(value).focus();
        }
    };
}
