import { Block } from "slate";

import { NODE_TYPES } from "../../constants";

export { default as ImageBlockButton } from "./ImageToolbarButton";

const BLOCK_TYPE = NODE_TYPES.PARAGRAPH;

const schema = {
    document: {
        last: { type: NODE_TYPES.PARAGRAPH },
        normalize: (change, { code, node, child }) => {
            switch (code) {
                case "last_child_type_invalid": {
                    const paragraph = Block.create(NODE_TYPES.PARAGRAPH);
                    return change.insertNodeByKey(node.key, node.nodes.size, paragraph);
                }
            }
        }
    },
    blocks: {
        image: {
            isVoid: true
        }
    }
};
