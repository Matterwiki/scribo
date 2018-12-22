import { Block } from "slate";

import { NODE_TYPES } from "../../common/constants";
import ImageNode from "../../common/components/EditorNodes/ImageNode";
import RenderNodePlugin from "../../common/plugins/renderNode";

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

export default function ImagePlugins(options) {
    return [
        { schema },
        RenderNodePlugin({
            node: ImageNode,
            type: BLOCK_TYPE
        })
    ];
}
