import React from "react";

export default {
    Bold({ children, attributes }) {
        return <strong {...attributes}>{children}</strong>;
    },
    Code({ children, attributes }) {
        return (
            <code className="editor-code-node" {...attributes}>
                {children}
            </code>
        );
    },
    Italics({ children, attributes }) {
        return <em {...attributes}>{children}</em>;
    },
    Underlined({ children, attributes }) {
        return <u {...attributes}>{children}</u>;
    },
    StrikeThrough({ children, attributes }) {
        return (
            <span className="editor-strikethrough-node" {...attributes}>
                {children}
            </span>
        );
    }
};
