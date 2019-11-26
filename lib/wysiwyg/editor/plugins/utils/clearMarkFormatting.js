import isKeyHotKey from 'is-hotkey';

/**
 * Clears mark formatting based on keypress and exit conditions
 *
 * TODO Could be moved to schema normalization!
 *
 * @param {object} options
 * @param {string} [options.keyName=null]
 */
export default function ClearMarkFormattingPlugin (options) {
  const keyName = options.keyName || null;

  return {
    // TODO Make sure that this accurate and is what is needed!
    // TODO This could become a schema normalization rule!
    onKeyUp (event, editor, next) {
      if (!isKeyHotKey(keyName)(event)) return next();
      editor.clearMarks().focus();
    }
  };
}
