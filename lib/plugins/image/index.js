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
        normalize: (change, { code, node }) => {
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

export function ImagePlugins(options) {
    return [
        { schema },
        RenderNodePlugin({
            node: function ImageBlockNode({ editor, node }) {
                const { data } = node;
                const { props: editorProps } = editor;

                const imgSrc = data.get("url");
                const imgFile = data.get("file");

                return (
                    <ImageNode
                        imgSrc={imgSrc}
                        imgFile={imgFile}
                        uploadFileHandler={editorProps.uploadFileHandler}
                        uploadLoadingComponent={editorProps.uploadLoadingComponent}
                    />
                );
            },
            nodeType: BLOCK_TYPE
        })
    ];
}
