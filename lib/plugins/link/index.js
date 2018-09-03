import React from "react";

import { LinkComponent } from "../../components/index";

export const INLINE_TYPE = "link";

export { default as LinkToolbarButton } from "./LinkToolbarButton";

export function LinkPlugin(options) {
    return {
        renderNode(props) {
            const { type, data } = props.node;

            if (type !== INLINE_TYPE) return;

            const href = data.get("href");
            return <LinkComponent href={href} {...props} />;
        }
    };
}
