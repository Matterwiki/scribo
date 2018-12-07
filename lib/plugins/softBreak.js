/**
 * Softbreak plugin, based off of https://github.com/ianstormtaylor/slate-plugins/tree/master/packages/slate-soft-break
 *
 * Reasons for pulling it into repo:
 *  - This could be achieved by using the slate-when and slate-soft-break plugins, but I had some trouble making it work with the latest version of slate.
 *  - Package decision fatigue x.x
 *
 *
 * Changes from the plugin:
 * - Adds extra option to filter based on block type.
 * - Removes the shiftKey option and mandates it for softbreaks
 *
 * TODO Make this mimic the same behaviour for `onPaste` as well
 * TODO Use `is-hotkey` package to check the keytypes
 * TODO Fix problem in the plugin repos and make PRs
 *
 * @param {*} options
 */
export default function SoftBreak(options = {}) {
    return {
        onKeyDown(event, editor, next) {
            const { value } = editor;

            if (options.blockType && !editor.hasBlock(value, options.blockType)) return next();
            if (event.key !== "Enter") return next();
            if (event.shiftKey === false) return next();

            return editor.insertText("\n");
        }
    };
}
