import { getEventTransfer } from 'slate-react';

/**
 * Remove fanciness from the default onPaste behaviour
 *
 */
export default function SanitizePaste () {
  return {
    onPaste (event, editor, next) {
      // NOTE: We aren't doing anything to softBreak here.
      // `getEventTransfer` seems to automatically strip out `↵` and convert them to `\n`
      const { text } = getEventTransfer(event);

      editor.insertText(text);
    }
  };
}
