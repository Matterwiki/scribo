import { isKeyHotkey } from "is-hotkey";

import { DEFAULT_NODE } from "../../constants";

/**
 * Clear list formatting if list text is empty and `enter` key is pressed.
 *
 * @param {*} options
 */
export function ClearListFormattingPlugin(options) {
    return {
        onKeyDown(event, editor, next) {
            if (!editor.hasList()) return next();

            if (!isKeyHotkey("enter")(event)) return next();

            const { value } = editor;

            const currentText = value.texts.map((t) => t.text).join("");
            if (currentText !== "") return next();

            editor
                .setBlocks(DEFAULT_NODE)
                .clearLists(value)
                .focus();

            return true;
        }
    };
}

/**
 * Increase or decrease list depth, based on whether `tab` or `shift+tab` was pressed
 *
 * @param {*} options
 */
export function AdjustListDepthPlugin(options) {
    return {
        onKeyDown(event, editor, next) {
            if (!editor.hasList()) return next();

            const tabWasPressed = isKeyHotkey("tab")(event);
            const shiftTabWasPressed = isKeyHotkey("shift+tab")(event);

            if (!tabWasPressed && !shiftTabWasPressed) return next();

            // Stop the default behaviour
            event.preventDefault();

            if (tabWasPressed) return editor.increaseListDepth();
            else if (shiftTabWasPressed) return editor.decreaseListDepth();

            // Something's wrong if we're here!
        }
    };
}
