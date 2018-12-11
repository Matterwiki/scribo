import { NODE_TYPES, DEFAULT_NODE } from "../constants";

/**
 * Generic commands and queries for the editor, all encapsulated in one plugin.
 *
 * This makes them all to be accessible via the editor namespace.
 *
 * TODO `value` argument may not be necessary, because we can get it from `editor.value`
 * TODO We should maybe move custom node specific utils into their plugin implementations. eg. `commands.addEmoji` into `plugins/emoji/index.js`, `commands.addOrRemoveList` into `plugins/list/listPlugins`.
 */
export default function CommandsAndQueriesPlugin() {
    return {
        commands: {
            /**
             * Toggle mark in active selection
             *
             * @param {*} editor
             * @param {*} type
             */
            addOrRemoveMark(editor, type) {
                return editor.toggleMark(type).focus();
            },

            /**
             * Clears all mark-type formatting in active selection
             *
             * @param {*} editor
             * @param {*} value
             */
            clearMarks(editor, value) {
                value.activeMarks.map((m) => m.type).forEach((m) => editor.removeMark(m));

                return editor;
            },

            /**
             * Clears any blocks in the selection and sets it to a paragraph.
             *
             * @param {*} editor
             * @param {*} value
             */
            clearBlocks(editor, value) {
                return editor
                    .setBlocks(DEFAULT_NODE)
                    .clearLists(value)
                    .focus();
            },

            /**
             * Clears all list-type nodes in the selection
             *
             * @param {*} value
             * @param {*} type
             */
            clearLists(editor, value) {
                if (editor.hasBlock(value, NODE_TYPES.LIST_ITEM)) {
                    editor
                        .unwrapBlock(NODE_TYPES.BULLETTED_LIST)
                        .unwrapBlock(NODE_TYPES.NUMBERED_LIST);
                }

                return editor;
            },

            /**
             * Add/remove blocks in current selection
             *
             * @param {*} editor
             * @param {*} value
             * @param {*} type
             */
            addOrRemoveBlock(editor, value, type) {
                const hasBlockInRange = editor.hasBlock(value, type);

                const { document, anchorBlock } = value;

                // Block already exists, switch to paragraph
                if (hasBlockInRange) {
                    editor.setBlocks(DEFAULT_NODE).clearLists(value);
                } else {
                    // Block needs to be set!
                    editor.setBlocks(type).clearLists(value);

                    // TODO this can probably be pushed into schema normalization!
                    // Insert empty paragraph block if there is nothing below inserted block
                    if (!document.getNextBlock(anchorBlock.key)) {
                        editor.insertBlock(DEFAULT_NODE).moveToStartOfPreviousBlock();
                    }
                }

                editor.focus();

                return editor;
            },

            /**
             * Inserts emoji at cursor location
             *
             * @param {*} editor
             * @param {*} nativeEmoji
             */
            insertEmoji(editor, nativeEmoji) {
                return editor
                    .insertInline({
                        type: NODE_TYPES.EMOJI,
                        data: { nativeEmoji }
                    })
                    .moveToStartOfNextText()
                    .insertText(" ")
                    .focus();
            },

            /**
             * Wraps selected text in an anchor tag
             *
             * @param {*} editor
             * @param {*} href
             */
            wrapLink(editor, href) {
                return editor
                    .wrapInline({
                        type: NODE_TYPES.LINK,
                        data: { href }
                    })
                    .moveToEnd()
                    .focus();
            },

            /**
             * Handles creation/upading link decorations on selected node
             *
             * @param {*} editor
             * @param {*} value
             * @param {*} href
             */
            createOrUpdateLink(editor, value, href) {
                const currentLinkData = editor.getLinkData(value);

                // For an existing link node, update property
                if (currentLinkData && currentLinkData.href) {
                    editor.setInlines({
                        type: NODE_TYPES.LINK,
                        data: { href }
                    });
                }
                // If link did not exist for selected text, add inline link to the selected text
                else if (value.selection.isExpanded) {
                    editor.wrapLink(href);
                }
                // For all other cases, insert url as text and add inline link to text
                else {
                    editor
                        .insertText(href)
                        .moveFocusBackward(href.length)
                        .wrapLink(href);
                }

                return editor;
            },

            /**
             * Removes (unwraps) anchor decoration from selected text if it existed
             *
             * @param {*} editor
             */
            clearLink(editor) {
                return editor.unwrapInline(NODE_TYPES.LINK).focus();
            },

            /**
             * Adds or removes list formatting in selection
             *
             * @param {*} editor
             * @param {*} type
             */
            addOrRemoveList(editor, type) {
                const { value } = editor;
                const { document, blocks } = value;

                const currentBlock = blocks.first();
                const parent = document.getParent(currentBlock.key);

                // TODO refactor to use editor.hasList() function
                const isListItem = editor.hasBlock(value, NODE_TYPES.LIST_ITEM);
                const isType = parent && parent.type === type;

                if (isListItem && isType) {
                    editor.setBlocks(DEFAULT_NODE).clearLists(value);
                } else if (isListItem) {
                    editor
                        .unwrapBlock(
                            type === NODE_TYPES.BULLETTED_LIST
                                ? NODE_TYPES.NUMBERED_LIST
                                : NODE_TYPES.BULLETTED_LIST
                        )
                        .wrapBlock(type);
                } else {
                    editor.setBlocks(NODE_TYPES.LIST_ITEM).wrapBlock(type);
                }

                editor.focus();

                return editor;
            },

            /**
             * Increase list depth of the current list item
             * @param {*} editor
             */
            increaseListDepth(editor) {
                const { value } = editor;
                const { document, blocks } = value;

                const currentBlock = blocks.first();
                const parent = document.getParent(currentBlock.key);

                if (!currentBlock || !parent) return editor;

                const childBlocks = parent.getBlocks();

                // If there is only one `li` in the block, do nothing
                if (childBlocks.size === 1) return editor;

                return editor
                    .setBlocks(NODE_TYPES.LIST_ITEM)
                    .wrapBlock(parent.type || NODE_TYPES.BULLETTED_LIST)
                    .focus();
            },

            /**
             * Decrease list depth for the current list item
             * @param {*} editor
             */
            decreaseListDepth(editor) {
                const { value } = editor;
                const { document, blocks } = value;

                const currentBlock = blocks.first();
                const parent = document.getParent(currentBlock.key);

                if (!currentBlock || !parent || !parent.type) return editor;

                const depth = document.getDepth(currentBlock.key);

                if (depth > 2) return editor.unwrapBlock(parent.type).focus();

                return editor;
            },

            /**
             * Insert image at selection
             *
             * @param {*} editor
             * @param {*} data
             * @param {*} target
             */
            insertImage(editor, data, target) {
                // TODO This section needs more ❤️
                if (target) editor.select(target);

                return editor.insertBlock({ type: NODE_TYPES.IMAGE, data });
            }
        },
        queries: {
            /**
             * Check if active selection has any marks
             *
             * @param {*} editor
             * @param {*} value
             * @param {*} type
             */
            hasMark(editor, value, type) {
                return value.activeMarks.some((mark) => mark.type === type);
            },

            /**
             * Check if active selection has any blocks
             *
             * @param {*} editor
             * @param {*} value
             * @param {*} type
             */
            hasBlock(editor, value, type) {
                return value.blocks.some((node) => node.type === type);
            },

            /**
             * Check if active selection has any links
             *
             * @param {*} editor
             * @param {*} value
             */
            hasLink(editor, value) {
                return value.inlines.some((inline) => inline.type === NODE_TYPES.LINK);
            },

            /**
             * Check if active selection has any lists
             *
             * @param {*} editor
             * @param {*} type
             */
            hasList(editor, type) {
                const { value } = editor;
                if (!value.blocks.size) return false;

                const parent = value.document.getParent(value.blocks.first().key);

                const hasListParent =
                    parent &&
                    (!type
                        ? parent.type === NODE_TYPES.NUMBERED_LIST ||
                          parent.type === NODE_TYPES.BULLETTED_LIST
                        : parent.type === type);

                return editor.hasBlock(value, NODE_TYPES.LIST_ITEM) && hasListParent;
            },

            /**
             * Gets associated link metadata in selection
             *
             * @param {*} editor
             * @param {*} value
             */
            getLinkData(editor, value) {
                if (!editor.hasLink(value)) return null;

                const node = value.inlines.find((inline) => inline.type === NODE_TYPES.LINK);
                return node.data.toJS();
            }
        }
    };
}
