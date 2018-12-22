import React from "react";

/**
 * Sets up a renderNode fn to render a Node React element
 *
 * @param {object} [options={}]
 * @param {JSX.Element} [options.node=null]
 * @param {string} [options.type=null]
 */
export default function RenderNodePlugin(options = {}) {
    const Node = options.node || null;
    const type = options.type || null;

    return {
        renderNode(props, editor, next) {
            const { node } = props;

            if (node.type !== type) return next();

            return <Node {...props} />;
        }
    };
}
