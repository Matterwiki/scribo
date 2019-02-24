import isKeyHotKey from "is-hotkey";

/**
 * Softbreak plugin, based off of https://github.com/ianstormtaylor/slate-plugins/tree/master/packages/slate-soft-break
 *
 * Reasons for pulling it into repo:
 *  - I've had some difficulty making it work with the latest version of slate.
 *  - Package decision fatigue x.x
 *
 * TODO Fix problem in the plugin repos and make PRs
 *
 */
export default function SoftBreak() {
    return {
        onKeyDown(event, editor, next) {
            if (!isKeyHotKey("enter")(event)) return next();
            return editor.insertText("\n");
        }
    };
}
