import React from "react";

import { Paragraph } from "../components/Node";

export const BLOCK_TYPE = "paragraph";

export default function ParagraphPlugin(options) {
    return {
        renderNode({ node, attributes, children }) {
            switch (node.type) {
                case BLOCK_TYPE:
                    return <Paragraph {...attributes}>{children}</Paragraph>;
            }
        }
    };
}
