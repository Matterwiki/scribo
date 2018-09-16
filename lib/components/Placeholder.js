import React from "react";

export default function Placeholder({ children, ...props }) {
    return (
        <span {...props} contentEditable={false} className="editor-placeholder">
            {children}
        </span>
    );
}
