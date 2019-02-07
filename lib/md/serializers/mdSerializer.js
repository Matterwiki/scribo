import Markdown from "slate-md-serializer";
import cloneDeep from "lodash.clonedeep";
import isFunction from "lodash.isfunction";

import { Value } from "slate";

import { NODE_TYPES } from "../../common/constants";

const SCRIBO_TYPES = NODE_TYPES;
const SERIALIZER_TYPES = {
    DELETED: "deleted",
    BLOCK_QUOTE: "block-quote",
    ORDERED_LIST: "ordered-list",
    CODE: "code",
    HEADING1: "heading1",
    HEADING2: "heading2",
    HEADING3: "heading3",
    TABLE_HEAD: "table-head",
    IMAGE: "image",
    PARAGRAPH: "paragraph"
};

/**
 * Serializer for converting md => slate's document structure and vice-versa
 *
 * We could've used the serializer from slate-md-serializer directly,
 * but some node types in the serializer didn't match our editor's internal node types.
 *
 * This extends the serializer from the package and does the needed conversions.
 *
 * TODO We'll have to make our own serializer that works for our use cases in the future!
 *
 * Some stuff to note:
 * - Serializing: scribo => slate-md-serializer
 * - Deserializing: slate-md-serializer => scribo
 *
 * Here's a list of node types that needs to converted everytime we serialize and deserialize:
 *
 *  - MARK
 *      + type changes
 *          +---------------+---------------------+
 *          |    scribo     | slate-md-serializer |
 *          +---------------+---------------------+
 *          | strikethrough | deleted             |
 *          +---------------+---------------------+
 *
 *
 *  - BLOCK
 *      + type changes
 *          +---------------+---------------------+
 *          |    scribo     | slate-md-serializer |
 *          +---------------+---------------------+
 *          | blockquote    | block-quote         |
 *          | numbered-list | ordered-list        |
 *          | code-block    | code                |
 *          | heading-one   | heading1            |
 *          | heading-two   | heading2            |
 *          | heading-three | heading3            |
 *          | table-cell    | table-head          |
 *          +---------------+---------------------+
 *
 *      + structural changes
 *          * Block type "image" is nested in a paragraph when slate-md-serializer's structure.
 *            We'll have to unwrap it for the sake of data consistency!
 *
 */
export default class MdSerializer extends Markdown {
    /**
     * This is an override of the the original `serialize` fn in the base.
     * This converts scribo node types  into node types compatible with `slate-md-serializer` and calls the base class method.
     *
     * If you looked at the tables above, the direction of conversion would go from  `slate-md-serializer` => scribo
     *
     * @param {*} value
     * @memberof MdSerializer
     */
    serialize(value) {
        // Get json representation of value
        const editorValue = value.toJSON();

        this.serializeNodes(editorValue.document.nodes);

        // Run the base serializer and return value
        return super.serialize(Value.fromJSON(editorValue));
    }

    /**
     * Recursive function that serializes nodes from our internal schema types
     * to something `slate-md-serializer` would understand
     *
     * @memberof MdSerializer
     */
    serializeNodes = (nodes) => {
        if (!nodes || !nodes.length) return;

        nodes.forEach((n) => {
            if (n.object === "block") {
                const conversionFn = {
                    [SCRIBO_TYPES.BLOCK_QUOTE]: () => (n.type = SERIALIZER_TYPES.BLOCK_QUOTE),
                    [SCRIBO_TYPES.NUMBERED_LIST]: () => (n.type = SERIALIZER_TYPES.ORDERED_LIST),
                    [SCRIBO_TYPES.CODE_BLOCK]: () => (n.type = SERIALIZER_TYPES.CODE),
                    [SCRIBO_TYPES.HEADING_ONE]: () => (n.type = SERIALIZER_TYPES.HEADING1),
                    [SCRIBO_TYPES.HEADING_TWO]: () => (n.type = SERIALIZER_TYPES.HEADING2),
                    [SCRIBO_TYPES.HEADING_THREE]: () => (n.type = SERIALIZER_TYPES.HEADING3),
                    [SCRIBO_TYPES.TABLE_CELL]: () => (n.type = SERIALIZER_TYPES.TABLE_HEAD),
                    [SCRIBO_TYPES.IMAGE]: () => {
                        // Wrap image block with a paragraph..
                        // `slate-md-serializer` expects image blocks to be in this format
                        Object.assign(n, {
                            data: {},
                            nodes: [cloneDeep(n)],
                            object: "block",
                            type: SERIALIZER_TYPES.PARAGRAPH
                        });

                        n.data = {};
                        n.nodes = [cloneDeep(n)];
                        n.type = SERIALIZER_TYPES.PARAGRAPH;
                    }
                }[n.type];

                if (isFunction(conversionFn)) conversionFn();

                this.serializeNodes(n.nodes);
            } else if (n.object === "text") {
                // Base case for the recursion -- It is assumed that marks reside only at the leaves in the slate structure.
                n.leaves.forEach((leaf) => {
                    leaf.marks.forEach((mark) => {
                        const conversionFn = {
                            [SCRIBO_TYPES.STRIKETHROUGH]: () =>
                                (mark.type = SERIALIZER_TYPES.DELETED)
                        }[mark.type];

                        if (isFunction(conversionFn)) conversionFn();
                    });
                });
            }
        });
    };

    /**
     * This is an override of the the original `deserialize` fn in base.
     *
     * This reformats the node types given out by the base class `deserialize` fn into scribo compatible node types.
     *
     * If you looked at the tables above, the direction of conversion would go from scribo => `slate-md-serializer`
     *
     * @param  {...any} args
     */
    deserialize(md) {
        // Get json representation of deserialized value
        const editorValue = super.deserialize(md).toJSON();

        // Convert to format that scribo would understand
        this.deserializeNodes(editorValue.document.nodes);

        // Reload json value into scribo
        return Value.fromJSON(editorValue);
    }

    /**
     * Recursive function that transforms nodes from `slate-md-serializer` schema types
     * to scribo schema types
     *
     * @memberof MdSerializer
     */
    deserializeNodes = (nodes) => {
        if (!nodes || !nodes.length) return;

        nodes.forEach((n) => {
            if (n.object === "block") {
                const conversionFn = {
                    [SERIALIZER_TYPES.BLOCK_QUOTE]: () => (n.type = SCRIBO_TYPES.BLOCK_QUOTE),
                    [SERIALIZER_TYPES.NUMBERED_LIST]: () => (n.type = SCRIBO_TYPES.ORDERED_LIST),
                    [SERIALIZER_TYPES.CODE_BLOCK]: () => (n.type = SCRIBO_TYPES.CODE),
                    [SERIALIZER_TYPES.HEADING_ONE]: () => (n.type = SCRIBO_TYPES.HEADING1),
                    [SERIALIZER_TYPES.HEADING_TWO]: () => (n.type = SCRIBO_TYPES.HEADING2),
                    [SERIALIZER_TYPES.HEADING_THREE]: () => (n.type = SCRIBO_TYPES.HEADING3),
                    [SERIALIZER_TYPES.PARAGRAPH]: () => {
                        if (n.nodes.length !== 1) return;
                        if (n.nodes[0].type !== SERIALIZER_TYPES.IMAGE) return;

                        // Unwrap image from paragraph block
                        // scribo expects it to be in this format
                        const [imageNode] = n.nodes;
                        Object.assign(n, imageNode);
                    }
                }[n.type];

                if (isFunction(conversionFn)) conversionFn();

                this.deserializeNodes(n.nodes);
            } else if (n.object === "text") {
                // Base case for the recursion -- It is assumed that marks reside only at the leaves in the slate structure.
                n.leaves.forEach((leaf) => {
                    leaf.marks.forEach((mark) => {
                        const conversionFn = {
                            [SERIALIZER_TYPES.STRIKETHROUGH]: () =>
                                (mark.type = SCRIBO_TYPES.DELETED)
                        }[mark.type];

                        if (isFunction(conversionFn)) conversionFn();
                    });
                });
            }
        });
    };
}
