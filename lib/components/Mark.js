import React from "react";

export default {
    Bold({ children, attributes }) {
        return <strong {...attributes}>{children}</strong>;
    },
    Code({ children, attributes }) {
        return <code {...attributes}>{children}</code>;
    },
    Italics({ children, attributes }) {
        return <em {...attributes}>{children}</em>;
    },
    Underlined({ children, attributes }) {
        return <u {...attributes}>{children}</u>;
    },
    StrikeThrough({ children, attributes }) {
        return (
            <span className="strikethrough-mark" {...attributes}>
                {children}
            </span>
        );
    }
};
