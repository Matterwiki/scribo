import React from "react";
import { DEFAULT_NODE } from "../../constants";

import PlaceholderNode from "./PlaceHolderNode";

export default function PlaceholderPlugin(options) {
    return {
        renderPlaceholder(props) {
            const { node, editor } = props;
            const { value, props: editorProps } = editor;
            const { customPlaceholder } = editorProps;

            // if there was no placeholder
            if (!customPlaceholder) return;

            // this seems to be a "non-block" node
            if (node.object !== "block") return;

            // the editor has some text on it
            if (node.text !== "") return;

            // document has a lot of blocks
            if (value.document.getBlocks().size > 1) return;

            // the node is not a paragraph
            if (node.type !== DEFAULT_NODE) return;

            return <PlaceholderNode>{customPlaceholder}</PlaceholderNode>;
        }
    };
}
