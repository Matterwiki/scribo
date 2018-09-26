import React from "react";

/**
 * Sets up a renderMark fn to render a Mark React element
 *
 * @param {object} [options={}]
 * @param {JSX.Element} [options.markNode=null]
 * @param {string} [options.markType=null]
 */
export default function RenderMarkPlugin(options = {}) {
    const MarkNode = options.markNode || null;
    const type = options.markType || null;

    return {
        renderMark(props) {
            if (props.mark.type !== type) return;

            return <MarkNode {...props} />;
        }
    };
}
