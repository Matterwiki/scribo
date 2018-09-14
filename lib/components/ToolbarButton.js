import React from "react";
import classnames from "classnames";

export default function ToolbarButton({ children, className, ...props }) {
    return (
        <button type="button" className={classnames("scribo-toolbar-button", className)} {...props}>
            {children}
        </button>
    );
}
