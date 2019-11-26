import { isKeyHotkey } from 'is-hotkey';

/**
 * Increase or decrease list depth, based on whether `tab` or `shift+tab` was pressed
 *
 * @param {*} options
 */
export default function AdjustListDepthPlugin (options) {
  return {
    onKeyDown (event, editor, next) {
      if (!editor.hasList()) return next();

      const tabWasPressed = isKeyHotkey('tab')(event);
      const shiftTabWasPressed = isKeyHotkey('shift+tab')(event);

      if (!tabWasPressed && !shiftTabWasPressed) return next();

      // Stop the default behaviour
      event.preventDefault();

      if (tabWasPressed) return editor.increaseListDepth();
      if (shiftTabWasPressed) return editor.decreaseListDepth();

      // Something's wrong if we're here!
    }
  };
}
