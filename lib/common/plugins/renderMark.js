import React from "react";

/**
 * Sets up a renderMark fn to render a Mark React element
 *
 * @param {object} [options={}]
 * @param {JSX.Element} [options.node=null]
 * @param {string} [options.type=null]
 */
export default function RenderMarkPlugin(options = {}) {
    const MarkNode = options.node || null;
    const type = options.type || null;

    return {
        renderMark(props, editor, next) {
            if (props.mark.type !== type) return next();

            return <MarkNode {...props} />;
        }
    };
}
