import React from "react";
import { Block } from "slate";

import { NODE_TYPES } from "../../constants";
import ImageNode from "./ImageNode";
import RenderNodePlugin from "../renderNode";

export { default as ImageBlockButton } from "./ImageToolbarButton";

const BLOCK_TYPE = NODE_TYPES.IMAGE;

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

export function ImagePlugins(options) {
    return [
        { schema },
        RenderNodePlugin({
            node: ImageNode,
            nodeType: BLOCK_TYPE
        })
    ];
}
