import Markdown from "slate-md-serializer";
import invert from "lodash.invert";
import isUndefined from "lodash.isundefined";

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
    TABLE_HEAD: "table-head"
};

/**
 * Serializer for converting md => slate's document structure and vice-versa
 *
 * We could've used the serializer from slate-md-serializer directly,
 * but some node types in the serializer didn't match our editor's internal node types.
 *
 * This extends the serializer from the package and does the needed conversions.
 *
 * Here's a list of node types that needs to converted everytime we serialize and deserialize:
 *
 *  - MARK
 * +---------------+---------------------+
 * |    scribo     | slate-md-serializer |
 * +---------------+---------------------+
 * | strikethrough | deleted             |
 * +---------------+---------------------+
 *
 *
 *  - BLOCK
 * +---------------+---------------------+
 * |    scribo     | slate-md-serializer |
 * +---------------+---------------------+
 * | blockquote    | block-quote         |
 * | numbered-list | ordered-list        |
 * | code-block    | code                |
 * | heading-one   | heading1            |
 * | heading-two   | heading2            |
 * | heading-three | heading3            |
 * | table-cell    | table-head          |
 * +---------------+---------------------+
 *
 */
export default class MdSerializer extends Markdown {
    /**
     * scribo block type => serializer block type
     * @memberof MdSerializer
     */
    serializeMapForBlocks = {
        [SCRIBO_TYPES.BLOCK_QUOTE]: SERIALIZER_TYPES.BLOCK_QUOTE,
        [SCRIBO_TYPES.NUMBERED_LIST]: SERIALIZER_TYPES.ORDERED_LIST,
        [SCRIBO_TYPES.CODE_BLOCK]: SERIALIZER_TYPES.CODE,
        [SCRIBO_TYPES.HEADING_ONE]: SERIALIZER_TYPES.HEADING1,
        [SCRIBO_TYPES.HEADING_TWO]: SERIALIZER_TYPES.HEADING2,
        [SCRIBO_TYPES.HEADING_THREE]: SERIALIZER_TYPES.HEADING3,
        [SCRIBO_TYPES.TABLE_CELL]: SERIALIZER_TYPES.TABLE_HEAD
    };

    /**
     * serializer block type => scribo block type
     * @memberof MdSerializer
     */
    deserializeMapForBlocks = invert(this.serializeMapForBlocks);

    /**
     * scribo mark type => serializer mark type
     * @memberof MdSerializer
     */
    serializeMapForMarks = {
        [SCRIBO_TYPES.STRIKETHROUGH]: SERIALIZER_TYPES.DELETED
    };

    /**
     * serializer block type => scribo block type
     * @memberof MdSerializer
     */
    deserializeMapForMarks = invert(this.serializeMapForMarks);

    /**
     * Recursive Traverse fn that goes through the node tree and changes the nodeTypes as needed
     *
     * @param {*} nodes
     * @param {*} conversionMapForBlocks
     * @param {*} conversionMapForMaps
     * @returns
     * @memberof MdSerializer
     */
    traverseAndChangeNodeType = (nodes, conversionMapForBlocks, conversionMapForMarks) => {
        if (isUndefined(conversionMapForBlocks) || isUndefined(conversionMapForMarks)) return;
        if (!nodes || !nodes.length) return;

        nodes.forEach((n) => {
            switch (n.object) {
                case "block": {
                    const converted = conversionMapForBlocks[n.type];
                    if (converted) n.type = converted;
                    this.traverseAndChangeNodeType(
                        n.nodes,
                        conversionMapForBlocks,
                        conversionMapForMarks
                    );
                    break;
                }

                case "text": {
                    n.leaves.forEach((leaf) => {
                        leaf.marks.forEach((mark) => {
                            const converted = conversionMapForMarks[mark.type];
                            if (converted) mark.type = converted;
                        });
                    });
                    break;
                }
            }
        });
    };

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

        // Convert to format that slate-md-serializer would understand
        this.traverseAndChangeNodeType(
            editorValue.document.nodes,
            this.serializeMapForBlocks,
            this.serializeMapForMarks
        );

        // Run the base serializer and return value
        return super.serialize(Value.fromJSON(editorValue));
    }

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
        this.traverseAndChangeNodeType(
            editorValue.document.nodes,
            this.deserializeMapForBlocks,
            this.deserializeMapForMarks
        );

        // Reload json value into scribo
        return Value.fromJSON(editorValue);
    }
}
