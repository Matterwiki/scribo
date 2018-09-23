import React from "react";

export const BLOCK_TYPE = "paragraph";

import ParagraphNode from "./ParagraphNode";

export default function ParagraphPlugin(options) {
    return {
        renderNode({ node, attributes, children }) {
            switch (node.type) {
                case BLOCK_TYPE:
                    return <ParagraphNode {...attributes}>{children}</ParagraphNode>;
            }
        }
    };
}
