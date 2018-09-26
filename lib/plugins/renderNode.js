import React from "react";

/**
 * Sets up a renderNode fn to render a Node React element
 *
 * @param {object} [options={}]
 * @param {JSX.Element} [options.node=null]
 * @param {string} [options.nodeType=null]
 */
export default function RenderNodePlugin(options = {}) {
    const Node = options.node || null;
    const type = options.nodeType || null;

    return {
        renderNode(props) {
            const { node } = props;

            if (node.type !== type) return;

            return <Node {...props} />;
        }
    };
}
