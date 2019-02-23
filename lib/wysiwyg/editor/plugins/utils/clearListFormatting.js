import { isKeyHotkey } from "is-hotkey";
import { DEFAULT_NODE } from "../../../../common/constants";

/**
 * Clear list formatting if list text is empty and `enter` key is pressed.
 *
 * @param {*} options
 */
export default function ClearListFormattingPlugin(options) {
    return {
        onKeyDown(event, editor, next) {
            if (!editor.hasList()) return next();

            if (!isKeyHotkey("enter")(event)) return next();

            const { value } = editor;

            const currentText = value.texts.map((t) => t.text).join("");
            if (currentText !== "") return next();

            editor
                .setBlocks(DEFAULT_NODE)
                .clearLists()
                .focus();

            return true;
        }
    };
}
