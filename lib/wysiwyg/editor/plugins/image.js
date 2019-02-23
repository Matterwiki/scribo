import { Block } from "slate";

import { NODE_TYPES } from "../../../common/constants";

const schema = {
    document: {
        last: { type: NODE_TYPES.PARAGRAPH },
        normalize: (editor, { code, node, child }) => {
            switch (code) {
                case "last_child_type_invalid": {
                    return editor.insertNodeByKey(
                        node.key,
                        node.nodes.size,
                        Block.create(NODE_TYPES.PARAGRAPH)
                    );
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

export default function ImagePlugins(options) {
    return [{ schema }];
}
