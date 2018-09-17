import React from "react";

export function HeadingOne({ children, attributes }) {
    return <h1 {...attributes}>{children}</h1>;
}
export function HeadingTwo({ children, attributes }) {
    return <h2 {...attributes}>{children}</h2>;
}
export function HeadingThree({ children, attributes }) {
    return <h3 {...attributes}>{children}</h3>;
}

export function Paragraph({ children, attributes }) {
    return (
        <p {...attributes} className="editor-paragraph-node">
            {children}
        </p>
    );
}

export function BlockQuote({ children, attributes }) {
    return (
        <blockquote {...attributes} className="editor-blockquote-node">
            {children}
        </blockquote>
    );
}
