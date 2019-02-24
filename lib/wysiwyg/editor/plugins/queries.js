import { NODE_TYPES } from "../../../common/constants";

/**
 * Generic queries for the editor, all encapsulated in one plugin.
 *
 * This makes them all to be accessible via the editor namespace.
 *
 * TODO We should maybe move custom node specific utils into their plugin implementations.
 *      eg. - `queries.getLinkData` into `plugins/link/`,
 *          - `queries.hasList` into `plugins/list/`.
 */
export default function EditorQueriesPlugin() {
    return {
        queries: {
            /**
             * Check if active selection has any marks
             *
             * @param {*} editor
             * @param {*} type
             */
            hasMark(editor, type) {
                const { value } = editor;
                return value.activeMarks.some((mark) => mark.type === type);
            },

            /**
             * Check if active selection is block quote or code block
             * @param {*} editor
             */
            isBlockQuoteOrCodeBlock(editor) {
                return (
                    editor.hasBlock(NODE_TYPES.BLOCK_QUOTE) ||
                    editor.hasBlock(NODE_TYPES.CODE_BLOCK)
                );
            },

            /**
             * Check if active selection has any blocks
             *
             * @param {*} editor
             * @param {*} type
             */
            hasBlock(editor, type) {
                const { value } = editor;
                return value.blocks.some((node) => node.type === type);
            },

            /**
             * Check if active selection has any links
             *
             * @param {*} editor
             */
            hasLink(editor) {
                const { value } = editor;
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
                          parent.type === NODE_TYPES.BULLETED_LIST
                        : parent.type === type);

                return editor.hasBlock(NODE_TYPES.LIST_ITEM) && hasListParent;
            },

            /**
             * Gets associated link metadata in selection
             *
             * @param {*} editor
             */
            getLinkData(editor) {
                if (!editor.hasLink()) return null;

                const { value } = editor;
                const node = value.inlines.find((inline) => inline.type === NODE_TYPES.LINK);
                return node.data.toJS();
            }
        }
    };
}
