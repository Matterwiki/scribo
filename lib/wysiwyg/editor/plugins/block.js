import When from './utils/when';
import SoftBreak from './utils/softBreak';
import ClearListFormatting from './utils/clearListFormatting';
import ClearBlockFormatting from './utils/clearBlockFormatting';
import AdjustListDepth from './utils/adjustListDepth';
import SanitizePaste from './utils/sanitizePaste';

export default function BlockPlugins (options) {
  return [
    // Clear block formatting when there is nothing in the document
    When({
      when: ({ value }) => value.document.text === '',
      plugin: ClearBlockFormatting()
    }),
    // Setup soft breaks within Blockquote or Codeblock
    When({
      when: editor => editor.isBlockQuoteOrCodeBlock(),
      plugin: SoftBreak()
    }),
    // Paste text without carriage returns within Blockquote or Codeblock
    When({
      when: editor => editor.isBlockQuoteOrCodeBlock(),
      plugin: SanitizePaste()
    }),
    // Clear list formatting on `↵` and when the present list item is empty
    ClearListFormatting(),
    // Tab / Shift tab indentation for lists
    AdjustListDepth()
  ];
}
